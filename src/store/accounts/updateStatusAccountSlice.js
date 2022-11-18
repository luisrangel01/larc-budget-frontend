import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateStatusAccountAsync = createAsyncThunk(
  "updateStatusAccount/updateStatusAccountAsync",
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

    const response = await fetch(
      `http://localhost:3002/accounts/${data.id}/status`,
      init
    ).then(async (data) => {
      const result = await data.json();
      const toReturn = {
        account: result,
        status: data.status,
        updateStatusAffected: result.affected || 0,
      };

      return toReturn;
    });

    return response;
  }
);

const initialState = {
  account: {},
  accountId: "",
  updateStatusAffected: 0,
  status: "idle",
  error: null,
};

export const updateStatusAccountSlice = createSlice({
  name: "updateStatusAccount",
  initialState: initialState,

  reducers: {
    resetUpdateStatusAccount: (state, action) => {
      return {
        status: "idle",
        account: {},
        accountId: "",
        updateStatusAffected: 0,
        error: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateStatusAccountAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(updateStatusAccountAsync.fulfilled, (state, action) => {
      if (action.payload?.status === 200) {
        state.updateStatusAffected = 1;
        state.status = "succeeded";
        state.accountId = action.payload.account.id;
        state.account = { ...action.payload.account };
      } else {
        state.updateStatusAffected = 0;
        state.status = "error";
      }
    });

    builder.addCase(updateStatusAccountAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { resetUpdateStatusAccount } = updateStatusAccountSlice.actions;

export default updateStatusAccountSlice.reducer;
