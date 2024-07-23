import { useSelector } from "react-redux"
import { selectCurrentToken } from "../app/authSlice"
import { jwtDecode } from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  if (token) {
    const decoded = jwtDecode(token)
    const { username, admin, id } = decoded.UserInfo

    const status = admin ? "Admin" : "Employee"

    return { username, status, admin, id }
  }

  return { username: "", admin: false, status: "Employee", id: "" }
}
export default useAuth
