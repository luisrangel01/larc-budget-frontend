import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getLoginAsync = createAsyncThunk(
  "auth/getLoginAsync",
  async (data) => {
    const body = { username: data.email, password: data.password };

    const response = await fetch("http://localhost:3002/auth/signin", {
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

const token = localStorage.getItem("access_token");

const initialState = {
  login: token ? true : false,
  user: "",
  token: token ? token : null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    // getLogin: (state, action) => {
    //   console.log(`action:`, action);
    //   state.login = true;
    //   state.user = action.payload;
    //   //localStorage.setItem('user',action.payload)
    // },

    logOut: (state, action) => {
      localStorage.removeItem("access_token");

      return {
        login: false,
        user: "",
        token: null,
        status: "idle",
        error: null,
      };
      // return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getLoginAsync.pending, (state, action) => {
      console.log(`xxx getLoginAsync.pending...`);
      state.status = "loading";
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getLoginAsync.fulfilled, (state, action) => {
      console.log(`xxx getLoginAsync.fulfilled...`);
      state.status = "succeeded";
      // Add user to the state array
      if (action.payload?.status === 201) {
        state.token = action.payload.accessToken;
        state.login = action.payload.accessToken ? true : false;
        localStorage.setItem("access_token", action.payload.accessToken);
      }
      //   state.entities.push(action.payload)
    });

    builder.addCase(getLoginAsync.rejected, (state, action) => {
      console.log(`xxx getLoginAsync.rejected...`);
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { getLogin, logOut } = authSlice.actions;

export default authSlice.reducer;
