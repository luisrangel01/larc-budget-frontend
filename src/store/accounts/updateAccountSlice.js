import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      `http://localhost:3002/accounts/${data.id}`,
      init
    ).then(async (data) => {
      console.log(`xxx data`, data);
      const result = await data.json();
      console.log(`xxx result`, result);
      const toReturn = {
        account: result,
        status: data.status,
        affected: result.affected || 0,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  account: {},
  accountId: "",
  affected: 0,
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
        affected: 0,
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateAccountAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(updateAccountAsync.fulfilled, (state, action) => {
      state.affected = action.payload.affected || 0;
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
