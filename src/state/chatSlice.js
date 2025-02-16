import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://10.0.2.2:8000";

export const getAllChats = createAsyncThunk('chats/getAllChats', async ({documentId, token}) => {
	try {
		const response = await axios.get(`${API_URL}/chat/history/${documentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return response.data;
	} catch(error) {
		console.log(error);
		return null;
	}
});

export const sendMessage = createAsyncThunk('chats/sendMessage', async ({documentId, message, token}) => {
	try {
		const response = await axios.post(`${API_URL}/chat/`, {
			document_id: documentId,
			message,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch(error) {
		console.log(error);
		return null;
	}
});

const initialState = {
	allChats: [],
	loading: false,
	error: null
}

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllChats.pending, (state) => {
				state.allChats = null;
				state.error = null;
				state.loading = true;
			})
			.addCase(getAllChats.fulfilled, (state, action) => {
				state.error = null;
				state.loading = false;
				state.allChats = action.payload;
			})
			.addCase(getAllChats.rejected, (state, action) => {
				state.allChats = null;
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(sendMessage.pending, (state) => {
				state.error = null;
				state.loading = true;
			})
			.addCase(sendMessage.fulfilled, (state, action) => {
				state.error = null;
				state.loading = false;
				state.allChats.push(action.payload);
			})
			.addCase(sendMessage.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			})
	}
});

export const {  } = chatSlice.actions;
export default chatSlice.reducer;