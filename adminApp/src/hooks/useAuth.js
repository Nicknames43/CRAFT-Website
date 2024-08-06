import { useSelector } from "react-redux"
import { selectCurrentToken } from "../app/authSlice.js"
import { jwtDecode } from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)

  if (token) {
    const decoded = jwtDecode(token)
    const { admin, id } = decoded.UserInfo

    const status = admin ? "Admin" : "Employee"

    return { status, admin, id }
  }

  return { admin: false, status: "", id: "" }
}
export default useAuth
