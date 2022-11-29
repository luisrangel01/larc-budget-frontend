import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import baseCurrencies from "../../assets/currencies.json";

export const getCurrenciesAsync = createAsyncThunk(
  "currencies/getCurrenciesAsync",
  async () => {
    const dataCurrencies = baseCurrencies;

    dataCurrencies.sort((a, b) => a.id - b.id);

    return [...dataCurrencies];
  }
);

const initialState = {
  currencies: [],
  status: "idle",
  error: null,
};

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState: initialState,

  extraReducers: (builder) => {
    builder.addCase(getCurrenciesAsync.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(getCurrenciesAsync.fulfilled, (state, action) => {
      state.currencies = action.payload;
      if (state.currencies.length > 0) {
        state.status = "succeeded";
      } else {
        state.status = "error";
      }
    });

    builder.addCase(getCurrenciesAsync.rejected, (state, action) => {
      console.error(action.error);
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default currenciesSlice.reducer;
