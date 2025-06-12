import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../Utils/general/authUtility";

export const documentsApi = createApi({
	reducerPath: "documentsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL + '/documents/',
	}),
	endpoints: (builder) => ({
		getDocuments: builder.query({
			query: (token) => ({
				url: '',
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
		}),
		createDocument: builder.mutation({
			query: ({token, formData}) => ({
				url: 'upload',
				method: 'POST',
				body: formData,
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'multipart/form-data'
				}
			})
		})
	})
})

export const { useGetDocumentsQuery, useCreateDocumentMutation } = documentsApi;