import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../authSlice"
import { BACKEND_API_URL } from "../../config/backendApiURL"

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_API_URL.base,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token")
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions)

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Property", "User", "SalesManager"],
  endpoints: (builder) => ({}),
})
