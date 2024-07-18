import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "./apiSlice"

const salesManagersAdapter = createEntityAdapter({})

const initialState = salesManagersAdapter.getInitialState()

export const salesManagersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSalesManagers: builder.query({
      query: () => "/salesManagers",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedSalesManagers = responseData.map((salesManager) => {
          salesManager.id = salesManager._id
          return salesManager
        })
        return salesManagersAdapter.setAll(initialState, loadedSalesManagers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "SalesManager", id: "LIST" },
            ...result.ids.map((id) => ({ type: "SalesManager", id })),
          ]
        } else return [{ type: "SalesManager", id: "LIST" }]
      },
    }),
    addNewSalesManager: builder.mutation({
      query: (initialSalesManagerData) => ({
        url: "/salesManagers",
        method: "POST",
        body: {
          ...initialSalesManagerData,
        },
      }),
      invalidatesTags: [{ type: "SalesManager", id: "LIST" }],
    }),
    updateSalesManager: builder.mutation({
      query: (initialSalesManagerData) => ({
        url: `/salesManagers/${initialSalesManagerData.id}`,
        method: "PUT",
        body: {
          ...initialSalesManagerData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SalesManager", id: arg.id },
      ],
    }),
    deleteSalesManager: builder.mutation({
      query: ({ id }) => ({
        url: `/salesManagers/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "SalesManager", id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetSalesManagersQuery,
  useAddNewSalesManagerMutation,
  useUpdateSalesManagerMutation,
  useDeleteSalesManagerMutation,
} = salesManagersApiSlice

// returns the query result object
export const selectSalesManagersResult =
  salesManagersApiSlice.endpoints.getSalesManagers.select()

// creates memoized selector
const selectSalesManagersData = createSelector(
  selectSalesManagersResult,
  (salesManagersResult) => salesManagersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSalesManagers,
  selectById: selectSalesManagerById,
  selectIds: selectSalesManagerIds,
  // Pass in a selector that returns the salesManagers slice of state
} = salesManagersAdapter.getSelectors(
  (state) => selectSalesManagersData(state) ?? initialState
)
