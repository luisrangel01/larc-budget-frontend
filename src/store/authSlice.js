import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export const getSignInAsync = createAsyncThunk(
  "auth/getSignInAsync",
  async (data) => {
    const body = { username: data.email, password: data.password };

    const response = await fetch("http://localhost:3002/auth/sign-in", {
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
  signIn: token ? true : false,
  user: { username: "", userId: "" },
  token: token ? token : null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    // getSignIn: (state, action) => {
    //   console.log(`action:`, action);
    //   state.signIn = true;
    //   state.user = action.payload;
    //   //localStorage.setItem('user',action.payload)
    // },

    signOut: (state, action) => {
      localStorage.removeItem("access_token");

      return {
        signIn: false,
        user: { username: "", userId: "" },
        token: null,
        status: "idle",
        error: null,
      };
      // return initialState;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSignInAsync.pending, (state, action) => {
      console.log(`xxx getSignInAsync.pending...`);
      state.status = "loading";
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getSignInAsync.fulfilled, (state, action) => {
      console.log(`xxx getSignInAsync.fulfilled...`);
      console.log(`action.payload?.status:`, action.payload?.status);

      // Add user to the state array
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        const decoded = jwt_decode(action.payload.accessToken);
        console.log(decoded);
        state.user = decoded;
        state.token = action.payload.accessToken;
        state.signIn = action.payload.accessToken ? true : false;
        localStorage.setItem("access_token", action.payload.accessToken);
      } else {
        state.status = "error";
      }
      //   state.entities.push(action.payload)
    });

    builder.addCase(getSignInAsync.rejected, (state, action) => {
      console.log(`xxx getSignInAsync.rejected...`);
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

// export const { getSignIn, signOut } = authSlice.actions;
export const { signOut } = authSlice.actions;

export default authSlice.reducer;
