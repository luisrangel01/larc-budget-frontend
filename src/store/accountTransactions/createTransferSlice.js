import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { REACT_APP_API_URL } = process.env;

export const createTransferAsync = createAsyncThunk(
  "createTransfer/createTransferAsync",
  async (data) => {
    const body = {
      originAccountId: data.accountId,
      destinationAccountId: data.destinationAccountId,
      currency: data.currency,
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
      `${REACT_APP_API_URL}/account-transactions/transfer`,
      init
    ).then(async (data) => {
      const result = await data.json();
      const toReturn = {
        originAccountTransaction:
          data.status === 201 ? result.originAccountTransaction : {},
        destinationAccountTransaction:
          data.status === 201 ? result.destinationAccountTransaction : {},
        status: data.status,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  originAccountTransaction: {},
  destinationAccountTransaction: {},
  originAccountTransactionId: "",
  destinationAccountTransactionId: "",
  status: "idle",
  error: null,
};

export const createTransferSlice = createSlice({
  name: "createTransfer",
  initialState: initialState,

  reducers: {
    resetCreateTransfer: (state, action) => {
      return {
        status: "idle",
        originAccountTransaction: {},
        destinationAccountTransaction: {},
        originAccountTransactionId: "",
        destinationAccountTransactionId: "",
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createTransferAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(createTransferAsync.fulfilled, (state, action) => {
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        state.originAccountTransactionId =
          action.payload.originAccountTransaction.id;
        state.destinationAccountTransactionId =
          action.payload.destinationAccountTransaction.id;
        state.originAccountTransaction = {
          ...action.payload.originAccountTransaction,
        };
        state.destinationAccountTransaction = {
          ...action.payload.destinationAccountTransaction,
        };
      } else {
        state.status = "error";
      }
    });

    builder.addCase(createTransferAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetCreateTransfer } = createTransferSlice.actions;

export default createTransferSlice.reducer;
