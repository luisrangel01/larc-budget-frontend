import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const deleteAccountAsync = createAsyncThunk(
  "deleteAccount/deleteAccountAsync",
  async (data) => {
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const response = await fetch(
      `http://localhost:3002/accounts/${data.id}`,
      init
    ).then(async (data) => {
      const result = await data.json();
      const toReturn = {
        account: result,
        status: data.status,
        deleteAffected: result.affected || 0,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  account: {},
  accountId: "",
  deleteAffected: 0,
  status: "idle",
  error: null,
};

export const deleteAccountSlice = createSlice({
  name: "deleteAccount",
  initialState: initialState,

  reducers: {
    resetDeleteAccount: (state, action) => {
      return {
        status: "idle",
        account: {},
        accountId: "",
        deleteAffected: 0,
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(deleteAccountAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(deleteAccountAsync.fulfilled, (state, action) => {
      state.deleteAffected = action.payload.deleteAffected || 0;
      if (action.payload?.status === 200) {
        state.status = "succeeded";
        state.accountId = action.payload.account.id;
        state.account = { ...action.payload.account };
      } else {
        state.status = "error";
      }
    });

    builder.addCase(deleteAccountAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetDeleteAccount } = deleteAccountSlice.actions;

export default deleteAccountSlice.reducer;
