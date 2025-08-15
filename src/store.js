import { configureStore } from "@reduxjs/toolkit";
import sqlQueryReducer from "./state/sqlQuerySlice";
import browseReducer from "./state/browseSlice";
import { documentsApi } from "./state/documentApi";
import { chatsApi } from "./state/chatApi";

export const store = configureStore({
  reducer: {
    [documentsApi.reducerPath]: documentsApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    sqlQuery: sqlQueryReducer,
    browse: browseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(documentsApi.middleware).concat(chatsApi.middleware),
});
