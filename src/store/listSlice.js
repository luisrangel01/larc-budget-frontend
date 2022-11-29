import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getListAsync = createAsyncThunk(
  "list/getListAsync",
  async (page) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}`
    ).then((data) => data.json());

    return response.data;
  }
);
const initialState = {
  listUser: [],
  num: 0,
};

export const listSlice = createSlice({
  name: "list",
  initialState: initialState,
  reducers: {
    getList: (state, action) => {
      state.listUser = [{ email: "luisrangelc@gmail.com" }];
    },
    deleteElement: (state, action) => {},
  },
  extraReducers: {
    [getListAsync.fulfilled]: (state, action) => {
      state.listUser = action.payload;
    },
  },
});

export const { getList } = listSlice.actions;

export default listSlice.reducer;
