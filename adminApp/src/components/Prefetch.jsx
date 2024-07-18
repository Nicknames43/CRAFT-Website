import { store } from "../app/store"
import { propertiesApiSlice } from "../app/api/propertiesApiSlice"
import { usersApiSlice } from "../app/api/usersApiSlice"
import { salesManagersApiSlice } from "../app/api/salesManagersApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing")
    const properties = store.dispatch(
      propertiesApiSlice.endpoints.getProperties.initiate()
    )
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    const salesManagers = store.dispatch(
      salesManagersApiSlice.endpoints.getSalesManagers.initiate()
    )

    return () => {
      console.log("unsubscribing")
      properties.unsubscribe()
      users.unsubscribe()
      salesManagers.unsubscribe()
    }
  }, [])

  return <Outlet />
}
export default Prefetch
