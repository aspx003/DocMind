import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://10.0.2.2:8000";

export const getAllSQLQueryChats = createAsyncThunk('getAllSQLQueryChats/sqlQuery', async ({token}) => {
	try {
		const response = await axios.get(API_URL + "/query/history", {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
		return response.data;
	} catch (error) {
		console.log(error);
		return error.message;
	}
});

export const postSQLQueryChat = createAsyncThunk('postSQLQueryChat/sqlQuery', async ({natural_query, token}) => {
	console.log(natural_query);
	try {
		const response = await axios.post(API_URL + "/query/", 
			{
				natural_query
			},
			{
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return error.message;
	}
})

const sqlQueryChatSlice = createSlice({
	name: 'sqlQuery',
	initialState: {
		data: [],
		loading: false,
		error: null
	},
	reducers: {},
	extraReducers: (build) => {
		build
		.addCase(getAllSQLQueryChats.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(getAllSQLQueryChats.fulfilled, (state, action) => {
			state.data = action.payload;
			state.loading = false;
			state.error = null;
		})
		.addCase(getAllSQLQueryChats.rejected, (state, action) => {
			state.loading = false;
			if(action.payload instanceof Error) {
				state.error = action.payload;
			}
		})
		.addCase(postSQLQueryChat.pending, (state) => {
			state.loading = true;
			state.error = null;
		})
		.addCase(postSQLQueryChat.fulfilled, (state, action) => {
			state.data.push(action.payload);
			state.loading = false;
			state.error = null;
		})
		.addCase(postSQLQueryChat.rejected, (state, action) => {
			state.loading = false;
			if(action.payload instanceof Error) {
				state.error = action.payload;
			}
		})
	}
})

export const {  } = sqlQueryChatSlice.actions;
export default sqlQueryChatSlice.reducer;