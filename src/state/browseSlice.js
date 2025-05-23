import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../Utils/general/authUtility";

const initialState = {
  urls: [],
  chats: [],
  loading: false,
  error: null,
};

export const getAllUrls = createAsyncThunk(
  "browse/getAllUrls",
  async ({ token }) => {
    try {
      const response = await axios.get(API_URL + "/webrag/urls", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return response.data.urls;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const addNewUrl = createAsyncThunk(
  "browse/addNewUrl",
  async ({ token, url }) => {
    try {
      const response = await axios.post(
        API_URL + "/webrag/url",
        {
          url,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
);

const browseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.urls = action.payload;
      })
      .addCase(getAllUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addNewUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.urls.push(action.payload);
      })
      .addCase(addNewUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default browseSlice.reducer;
