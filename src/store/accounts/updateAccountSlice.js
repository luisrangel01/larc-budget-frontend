import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const { REACT_APP_API_URL } = process.env;

export const updateAccountAsync = createAsyncThunk(
  "updateAccount/updateAccountAsync",
  async (data) => {
    const body = {
      name: data.name,
      type: data.type,
      currency: data.currency,
      currentBalance: data.currentBalance,
      color: data.color,
    };

    const init = {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };

    const response = await fetch(
      `${REACT_APP_API_URL}/accounts/${data.id}`,
      init
    ).then(async (data) => {
      const result = await data.json();
      const toReturn = {
        account: result,
        status: data.status,
        updateAffected: result.affected || 0,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  account: {},
  accountId: "",
  updateAffected: 0,
  status: "idle",
  error: null,
};

export const updateAccountSlice = createSlice({
  name: "updateAccount",
  initialState: initialState,

  reducers: {
    resetUpdateAccount: (state, action) => {
      return {
        status: "idle",
        account: {},
        accountId: "",
        updateAffected: 0,
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateAccountAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(updateAccountAsync.fulfilled, (state, action) => {
      state.updateAffected = action.payload.updateAffected || 0;
      if (action.payload?.status === 201) {
        state.status = "succeeded";
        state.accountId = action.payload.account.id;
        state.account = { ...action.payload.account };
      } else {
        state.status = "error";
      }
    });

    builder.addCase(updateAccountAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetUpdateAccount } = updateAccountSlice.actions;

export default updateAccountSlice.reducer;
