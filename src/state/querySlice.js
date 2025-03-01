import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const API_URL = "http://10.0.2.2:8000";

export const getAllChats = createAsyncThunk('getAllChats/queryChat', async ({token}) => {
	try{

		const response = await axios.get(API_URL + '/query/history/', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})

		console.log(response.data);

		return response.data;
	} catch(error) {
		console.log(error);
		return null;
	}
});

export const postChat = createAsyncThunk('postChat/queryChat', async ({token, naturalQuery}) => {
	try{
		const response = await axios.post(API_URL + '/query/',
		{
			natural_query: naturalQuery
		},
		{
			headers: {
				Authorization: 'Bearer ' + token
			},

		})

		return response.data;
	} catch(error) {
		console.log(error);
		return null;
	}
})

const queryChatSlice = createSlice({
	name: "queryChat",
	initialState: {
		loading: false,
		allChats: [],
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllChats.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getAllChats.fulfilled, (state, action) => {
			state.loading = false;
			state.allChats = action.payload;
		});
		builder.addCase(getAllChats.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
		builder.addCase(postChat.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postChat.fulfilled, (state, action) => {
			state.loading = false;
			state.allChats.push(action.payload);
		});
		builder.addCase(postChat.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message;
		});
	}
});

export const {  } = queryChatSlice.actions;
export default queryChatSlice.reducer;