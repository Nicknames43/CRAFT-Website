import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "../../app/api/authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../app/authSlice"
import PulseLoader from "react-spinners/PulseLoader"

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)
  const location = useLocation()

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation()

  useEffect(() => {
    // React 18 Strict Mode
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token")
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)

    // eslint-disable-next-line
  }, [])

  let content
  if (!persist) {
    // persist: no
    console.log("no persist")
    content = <Outlet />
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading")
    content = <PulseLoader color={"#FFF"} />
  } else if (isError) {
    //persist: yes, token: no
    console.log("error")
    content = <Navigate to="/" state={{ from: location }} replace />
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success")
    content = <Outlet />
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit")
    console.log(isUninitialized)
    content = <Outlet />
  }

  return content
}
export default PersistLogin
