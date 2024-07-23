import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBuilding,
  faRightFromBracket,
  faUserPen,
  faUsers,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { useSendLogoutMutation } from "../app/api/authApiSlice"
import useAuth from "../hooks/useAuth"

const DASH_REGEX = /^\/dash(\/)?$/
const PROPERTIES_REGEX = /^\/dash\/properties(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const SALES_MANAGERS_REGEX = /^\/dash\/salesManagers(\/)?$/

const DashHeader = () => {
  const { admin, id } = useAuth()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [isSuccess, navigate])

  const onPropertiesClicked = () => navigate("/dash/properties")
  const onUsersClicked = () => navigate("/dash/users")
  const onSalesManagersClicked = () => navigate("/dash/salesManagers")
  const onEditAccountClicked = () => navigate(`/dash/users/${id}`)

  let dashClass = null
  if (
    !DASH_REGEX.test(pathname) &&
    !PROPERTIES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname) &&
    !SALES_MANAGERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small"
  }

  let propertiesButton = null
  if (!PROPERTIES_REGEX.test(pathname) && pathname.includes("/dash")) {
    propertiesButton = (
      <button
        className="icon-button"
        title="Properties"
        onClick={onPropertiesClicked}
      >
        <FontAwesomeIcon icon={faBuilding} />
      </button>
    )
  }

  let salesManagerButton = null
  if (!SALES_MANAGERS_REGEX.test(pathname) && pathname.includes("/dash")) {
    salesManagerButton = (
      <button
        className="icon-button"
        title="SalesManagers"
        onClick={onSalesManagersClicked}
      >
        <FontAwesomeIcon icon={faUserTie} />
      </button>
    )
  }

  let userButton = null
  if (admin && !USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
    userButton = (
      <button className="icon-button" title="Users" onClick={onUsersClicked}>
        <FontAwesomeIcon icon={faUsers} />
      </button>
    )
  }

  let accountButton = null
  if (pathname.includes("/dash") && !pathname.includes(id)) {
    accountButton = (
      <button
        className="icon-button"
        title="Users"
        onClick={onEditAccountClicked}
      >
        <FontAwesomeIcon icon={faUserPen} />
      </button>
    )
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  const errClass = isError ? "errmsg" : "offscreen"

  let buttonContent
  if (isLoading) {
    // buttonContent = <PulseLoader color={"#FFF"} />
  } else {
    buttonContent = (
      <>
        {propertiesButton}
        {salesManagerButton}
        {userButton}
        {accountButton}
        {logoutButton}
      </>
    )
  }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">CRAFT Developement</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  )

  return content
}
export default DashHeader
