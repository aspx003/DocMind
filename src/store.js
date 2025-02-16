import { configureStore } from "@reduxjs/toolkit";

import documentsReducer from "./state/documentsSlice"
import chatsReducer from "./state/chatSlice";

export const store = configureStore({
	reducer: {
		documents: documentsReducer,
		chats: chatsReducer
	},
});