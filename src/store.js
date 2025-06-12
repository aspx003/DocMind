import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./state/chatSlice";
import sqlQueryReducer from "./state/sqlQuerySlice";
import browseReducer from "./state/browseSlice";
import { documentsApi } from "./state/documentApi";

export const store = configureStore({
  reducer: {
    [documentsApi.reducerPath]: documentsApi.reducer,
    chats: chatsReducer,
    sqlQuery: sqlQueryReducer,
    browse: browseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(documentsApi.middleware),
});
