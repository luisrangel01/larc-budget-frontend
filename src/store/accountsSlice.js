import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAccountsAsync = createAsyncThunk(
  "userAccounts/getAccountsAsync",
  async () => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const response = await fetch("http://localhost:3002/accounts", init).then(
      async (data) => {
        const result = await data.json();
        const toReturn = { accounts: result, status: data.status };

        return toReturn;
      }
    );

    return response;
  }
);

const initialState = {
  accounts: [],
  status: "idle",
  error: null,
};

export const accountsSlice = createSlice({
  name: "userAccounts",
  initialState: initialState,

  reducers: {
    resetAccounts: (state, action) => {
      return {
        status: "idle",
        accounts: [],
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAccountsAsync.pending, (state, action) => {
      state.status = "loading";
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAccountsAsync.fulfilled, (state, action) => {
      // Add user to the state array
      if (action.payload?.status === 200) {
        state.status = "succeeded";
        state.accounts = [...action.payload.accounts];
      } else {
        state.status = "error";
      }
    });

    builder.addCase(getAccountsAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
