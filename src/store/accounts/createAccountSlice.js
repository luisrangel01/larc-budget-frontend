import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createAccountAsync = createAsyncThunk(
  "createAccount/createAccountAsync",
  async (data) => {
    const body = {
      name: data.name,
      type: data.type,
      currency: data.currency,
      currentBalance: data.currentBalance,
      color: data.color,
    };

    const init = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const response = await fetch("http://localhost:3002/accounts", init).then(
      async (data) => {
        const result = await data.json();
        const toReturn = { account: result, status: data.status };

        return toReturn;
      }
    );

    return response;
  }
);

const initialState = {
  account: {},
  accountId: "",
  status: "idle",
  error: null,
};

export const createAccountSlice = createSlice({
  name: "createAccount",
  initialState: initialState,

  reducers: {
    resetCreateAccount: (state, action) => {
      return {
        status: "idle",
        account: {},
        accountId: "",
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createAccountAsync.pending, (state, action) => {
      state.status = "loading";
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(createAccountAsync.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        state.accountId = action.payload.account.id;
        state.account = { ...action.payload.account };
      } else {
        state.status = "error";
      }
    });

    builder.addCase(createAccountAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetCreateAccount } = createAccountSlice.actions;

export default createAccountSlice.reducer;
