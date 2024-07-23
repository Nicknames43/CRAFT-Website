import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useParams } from "react-router-dom"
import { ROLES } from "../config/roles"

const RequireAuth = ({ allowedRoles = [], matchId = false }) => {
  const { id = "" } = useParams()
  const location = useLocation()
  const { status, id: authId } = useAuth()

  const content =
    allowedRoles.includes(status) ||
    (matchId && (status === ROLES.admin || id === authId)) ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )

  return content
}
export default RequireAuth
