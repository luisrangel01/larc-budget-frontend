import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSignUpAsync = createAsyncThunk(
  "authSignUp/getSignUpAsync",
  async (data) => {
    const body = {
      username: data.email,
      password: data.password,
      name: data.name,
    };

    const response = await fetch("http://localhost:3002/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer  " + localStorage.getItem("access_token"),
      },
    }).then(async (data) => {
      const result = await data.json();
      return { ...result, status: data.status };
    });

    return response;
  }
);

const initialState = {
  signUp: false,
  user: { username: "", id: "" },
  status: "idle",
  error: null,
};

export const authSignUpSlice = createSlice({
  name: "authSignUp",
  initialState: initialState,

  reducers: {
    resetSignUp: (state, action) => {
      return {
        signUp: false,
        user: { username: "", id: "" },
        status: "idle",
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSignUpAsync.pending, (state, action) => {
      console.log(`xxx getSignUpAsync.pending...`);
      state.status = "loading";
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSignUpAsync.fulfilled, (state, action) => {
      console.log(`xxx getSignUpAsync.fulfilled...`);
      console.log(`action.payload?.status:`, action.payload?.status);
      console.log(`action.payload?:`, action.payload);

      // Add user to the state array
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        state.user = action.payload;
        state.signUp = action.payload.id ? true : false;
      } else {
        state.status = "error";
      }
    });

    builder.addCase(getSignUpAsync.rejected, (state, action) => {
      console.log(`xxx getSignUpAsync.rejected...`);
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetSignUp } = authSignUpSlice.actions;

export default authSignUpSlice.reducer;
