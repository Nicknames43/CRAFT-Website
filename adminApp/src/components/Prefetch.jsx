import { store } from "../app/store"
import { propertiesApiSlice } from "../app/api/propertiesApiSlice"
import { usersApiSlice } from "../app/api/usersApiSlice"
import { salesManagersApiSlice } from "../app/api/salesManagersApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      propertiesApiSlice.util.prefetch("getProperties", "propertiesList", {
        force: true,
      })
    )
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    )
    store.dispatch(
      salesManagersApiSlice.util.prefetch(
        "getSalesManagers",
        "salesManagersList",
        { force: true }
      )
    )
  }, [])

  return <Outlet />
}
export default Prefetch
