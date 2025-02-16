import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://10.0.2.2:8000";

export const getAllDocuments = createAsyncThunk('documents/getAllDocuments', async ({token}) => {
	try {
		const response = await axios.get(API_URL + '/documents/', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})

		return response.data;
	} catch(error) {
		console.log(error);
		return error;
	}
});

const initialState = {
	loading: false,
	error: null,
	documents: null,
	singleDocument: null,
};

const documentsSlice = createSlice({
	name: 'documents',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllDocuments.pending, (state) => {
				state.loading = true;
				state.error = false;
				state.documents = null;
			})
			.addCase(getAllDocuments.fulfilled, (state, action) => {
				state.loading = false;
				state.error = false;
				if(action.payload instanceof Error) {
					state.error = action.payload;
				} else {
					state.documents = action.payload;
				}
			})
			.addCase(getAllDocuments.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
				state.documents = null;
			})
	}
})

export const {  } = documentsSlice.actions;
export default documentsSlice.reducer;