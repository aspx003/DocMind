import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
	},
	reducers: {
		setAuth: (state, action) => {
			console.log(action.payload);
			state.user = action.payload;
		},
		removeAuth: (state) => {
			state.user = null;
		}
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;