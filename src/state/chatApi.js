import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../Utils/general/authUtility";

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + "/chat/",
  }),
  endpoints: (builder) => ({
    getChats: builder.query({
      query: ({ token, documentId }) => ({
        url: `history/${documentId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
    }),
    postChat: builder.mutation({
      query: ({ token, documentId, message }) => ({
        url: "",
        method: "POST",
        body: {
          document_id: documentId,
          message,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }),
      transformResponse: (response, _meta, _arg) => {
        return response;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            chatsApi.util.updateQueryData("getChats", arg, (draft) => {
              draft.push(data);
            })
          );
        } catch (error) {
          console.error("Error updating cache:", error);
        }
      },
    }),
  }),
});

export const { useGetChatsQuery, usePostChatMutation } = chatsApi;
