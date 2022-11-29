import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTransactionsAsync = createAsyncThunk(
  "getTransactions/getTransactionsAsync",
  async (data) => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const url = `http://localhost:3002/account-transactions/${data.accountId}`;

    const response = await fetch(url, init).then(async (data) => {
      const status = data.status;
      const statusText = data.statusText;
      const result = await data.json();

      const toReturn = {
        transactions: status === 200 ? result : [],
        status,
        statusText,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  transactions: [],
  statusCode: 0,
  status: "idle",
  statusText: "idle",
  error: null,
};

export const transactionsSlice = createSlice({
  name: "getTransactions",
  initialState: initialState,

  reducers: {
    resetTransactions: (state, action) => {
      return {
        statusCode: 0,
        status: "idle",
        statusText: "idle",
        transactions: [],
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTransactionsAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getTransactionsAsync.fulfilled, (state, action) => {
      state.statusCode = action.payload?.status;
      state.statusText = action.payload?.statusText;
      if (action.payload?.status === 200) {
        state.status = "succeeded";
        state.transactions = [...action.payload.transactions];
      } else {
        state.status = "error";
      }
    });

    builder.addCase(getTransactionsAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
