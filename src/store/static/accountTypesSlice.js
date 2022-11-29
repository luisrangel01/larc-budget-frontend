import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseAccountTypes from "../../assets/accountTypes.json";

export const getAccountTypesAsync = createAsyncThunk(
  "accountTypes/getAccountTypesAsync",
  async () => {
    const dataAccountTypes = baseAccountTypes;

    dataAccountTypes.sort((a, b) => a.id - b.id);

    return [...dataAccountTypes];
  }
);

const initialState = {
  types: [],
  status: "idle",
  error: null,
};

export const accountTypesSlice = createSlice({
  name: "accountTypes",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(getAccountTypesAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getAccountTypesAsync.fulfilled, (state, action) => {
      state.types = action.payload;
      if (state.types.length > 0) {
        state.status = "succeeded";
      } else {
        state.status = "error";
      }
    });

    builder.addCase(getAccountTypesAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default accountTypesSlice.reducer;
