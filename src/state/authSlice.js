import { createSlice } from "@reduxjs/toolkit";
import { getData, storeData, removeData } from "../Utils/localstorage/asyncstorage";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: getData("user"),
	},
	reducers: {
		setAuth: (state, action) => {
			storeData("user", JSON.stringify(action.payload));
			state.user = action.payload;
		},
		removeAuth: (state) => {
			removeData("user");
			state.user = null;
		}
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;