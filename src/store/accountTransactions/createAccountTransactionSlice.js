import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createAccountTransactionAsync = createAsyncThunk(
  "createAccountTransaction/createAccountTransactionAsync",
  async (data) => {
    const body = {
      accountId: data.accountId,
      currency: data.currency,
      type: data.type,
      amount: data.amount,
      note: data.note,
    };

    const init = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const response = await fetch(
      "http://localhost:3002/account-transactions",
      init
    ).then(async (data) => {
      const result = await data.json();
      const toReturn = {
        transaction: data.status === 201 ? result : {},
        status: data.status,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  transaction: {},
  transactionId: "",
  status: "idle",
  error: null,
};

export const createAccountTransactionSlice = createSlice({
  name: "createAccountTransaction",
  initialState: initialState,

  reducers: {
    resetCreateAccountTransaction: (state, action) => {
      return {
        status: "idle",
        transaction: {},
        transactionId: "",
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createAccountTransactionAsync.pending, (state, action) => {
      state.status = "loading";
    });

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      createAccountTransactionAsync.fulfilled,
      (state, action) => {
        // Add user to the state array
        if (action.payload?.status === 201) {
          state.status = "succeeded";
          state.transactionId = action.payload.transaction.id;
          state.transaction = { ...action.payload.transaction };
        } else {
          state.status = "error";
        }
      }
    );

    builder.addCase(createAccountTransactionAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetCreateAccountTransaction } =
  createAccountTransactionSlice.actions;

export default createAccountTransactionSlice.reducer;
