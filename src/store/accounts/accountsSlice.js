import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { REACT_APP_API_URL } = process.env;

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

    const response = await fetch(`${REACT_APP_API_URL}/accounts`, init).then(
      async (data) => {
        const status = data.status;
        const statusText = data.statusText;
        const result = await data.json();

        const toReturn = {
          accounts: status === 200 ? result : [],
          status,
          statusText,
        };

        return toReturn;
      }
    );

    return response;
  }
);

const initialState = {
  accounts: [],
  statusCode: 0,
  status: "idle",
  statusText: "idle",
  error: null,
};

export const accountsSlice = createSlice({
  name: "userAccounts",
  initialState: initialState,

  reducers: {
    resetAccounts: (state, action) => {
      return {
        statusCode: 0,
        status: "idle",
        statusText: "idle",
        accounts: [],
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAccountsAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getAccountsAsync.fulfilled, (state, action) => {
      state.statusCode = action.payload?.status;
      state.statusText = action.payload?.statusText;
      if (action.payload?.status === 200) {
        state.status = "succeeded";
        action.payload.accounts.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        );
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
