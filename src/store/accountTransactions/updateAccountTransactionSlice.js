import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { REACT_APP_API_URL } = process.env;

export const updateAccountTransactionAsync = createAsyncThunk(
  "updateAccountTransaction/updateAccountTransactionAsync",
  async (data) => {
    const body = {
      status: "INACTIVE",
    };

    const init = {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const url = `${REACT_APP_API_URL}/account-transactions/${data.transactionId}/status`;

    const response = await fetch(url, init).then(async (data) => {
      const result = await data.json();
      const toReturn = {
        updateResult: data.status === 200 ? result.updateResult : {},
        transaction: data.status === 200 ? result.transaction : {},
        revertAccountTransaction:
          data.status === 200 ? result.revertAccountTransaction : {},
        status: data.status,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  transaction: {},
  revertAccountTransaction: {},
  updateResult: {},
  transactionId: "",
  status: "idle",
  error: null,
};

export const updateAccountTransactionSlice = createSlice({
  name: "updateAccountTransaction",
  initialState: initialState,

  reducers: {
    resetUpdateAccountTransaction: (state, action) => {
      return {
        status: "idle",
        transaction: {},
        revertAccountTransaction: {},
        updateResult: {},
        transactionId: "",
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateAccountTransactionAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(
      updateAccountTransactionAsync.fulfilled,
      (state, action) => {
        if (action.payload?.status === 200) {
          state.status = "succeeded";
          state.transactionId = action.payload.transaction.id;
          state.updateResult = { ...action.payload.updateResult };
          state.transaction = { ...action.payload.transaction };
          state.revertAccountTransaction = {
            ...action.payload.revertAccountTransaction,
          };
        } else {
          state.status = "error";
        }
      }
    );

    builder.addCase(updateAccountTransactionAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetUpdateAccountTransaction } =
  updateAccountTransactionSlice.actions;

export default updateAccountTransactionSlice.reducer;
