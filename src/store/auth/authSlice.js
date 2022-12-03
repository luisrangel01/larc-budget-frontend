import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const { REACT_APP_API_URL } = process.env;

export const getSignInAsync = createAsyncThunk(
  "auth/getSignInAsync",
  async (data) => {
    const body = { username: data.email, password: data.password };

    const response = await fetch(`${REACT_APP_API_URL}/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer  " + localStorage.getItem("access_token"),
      },
    }).then(async (data) => {
      const result = await data.json();
      return {
        ...result,
        status: data.status,
        statusCode: data.status !== 201 ? result.statusCode : data.status,
      };
    });

    return response;
  }
);

export const getTokenCheckAsync = createAsyncThunk(
  "auth/getTokenCheckAsync",
  async () => {
    const response = await fetch(`${REACT_APP_API_URL}/auth/test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer  " + localStorage.getItem("access_token"),
      },
    }).then(async (data) => {
      const { status } = data;
      const result = await data.json();
      return { ...result, status: data.status, statusCode: status };
    });

    return response;
  }
);

const token = localStorage.getItem("access_token");

const initialState = {
  signIn: token ? true : false,
  user: { username: "", userId: "" },
  token: token ? token : null,
  tokenValid: false,
  status: "idle",
  statusCode: 0,
  message: "",
  statusToken: "idle",
  statusTokenCode: 0,
  error: null,
  errorToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    // getSignIn: (state, action) => {
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
        tokenValid: false,
        status: "idle",
        statusCode: 0,
        message: "",
        statusToken: "idle",
        statusTokenCode: 0,
        error: null,
        errorToken: null,
      };
      // return initialState;
    },
    resetSignInError: (state, action) => {
      return { ...state, statusCode: 0 };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getSignInAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getSignInAsync.fulfilled, (state, action) => {
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        const decoded = jwt_decode(action.payload.accessToken);
        state.user = decoded;
        state.token = action.payload.accessToken;
        state.tokenValid = true;
        state.signIn = action.payload.accessToken ? true : false;
        localStorage.setItem("access_token", action.payload.accessToken);
      } else {
        state.status = "error";
      }
      //   state.entities.push(action.payload)
    });

    builder.addCase(getSignInAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getTokenCheckAsync.pending, (state, action) => {
      state.statusToken = "loading";
    });

    builder.addCase(getTokenCheckAsync.fulfilled, (state, action) => {
      state.statusTokenCode = action.payload?.statusCode;
      if (action.payload?.status === 201) {
        state.statusToken = "succeeded";
        state.tokenValid = true;
      } else {
        state.tokenValid = false;
        state.statusToken = "error";
      }
    });

    builder.addCase(getTokenCheckAsync.rejected, (state, action) => {
      console.error(action.error);
      state.tokenValid = false;
      state.statusToken = "failed";
      state.error = action.error.message;
    });
  },
});

// export const { getSignIn, signOut } = authSlice.actions;
export const { signOut, resetSignInError } = authSlice.actions;

export default authSlice.reducer;
