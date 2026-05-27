import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY' : import.meta.env.VITE_API_KEY
        }
    }),
    endpoint: (build) => {
        return ({

        })
    }
})