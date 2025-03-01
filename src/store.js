import { configureStore } from "@reduxjs/toolkit";

import documentsReducer from "./state/documentsSlice"
import chatsReducer from "./state/chatSlice";
import sqlQueryReducer from "./state/sqlQuerySlice";

export const store = configureStore({
	reducer: {
		documents: documentsReducer,
		chats: chatsReducer,
		sqlQuery: sqlQueryReducer
	},
});