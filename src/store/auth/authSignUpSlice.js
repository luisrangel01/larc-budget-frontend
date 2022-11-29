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
      state.status = "loading";
    });

    builder.addCase(getSignUpAsync.fulfilled, (state, action) => {
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        state.user = action.payload;
        state.signUp = action.payload.id ? true : false;
      } else {
        state.status = "error";
      }
    });

    builder.addCase(getSignUpAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetSignUp } = authSignUpSlice.actions;

export default authSignUpSlice.reducer;
