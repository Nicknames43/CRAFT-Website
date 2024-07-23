import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import DashLayout from "./components/DashLayout"
import Login from "./pages/login"
import Landing from "./pages/landing"
import PropertiesList from "./pages/properties"
import Property from "./pages/property"
import NewProperty from "./pages/newProperty"
import UsersList from "./pages/users"
import User from "./pages/user"
import NewUser from "./pages/newUser"
import SalesManagersList from "./pages/salesManagers"
import SalesManager from "./pages/salesManager"
import NewSalesManager from "./pages/newSalesManager"
import Prefetch from "./components/Prefetch"
import PersistLogin from "./pages/login/PersistLogin"
import RequireAuth from "./components/RequireAuth"
import { ROLES } from "./config/roles"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Landing />} />

                <Route path="properties">
                  <Route index element={<PropertiesList />} />
                  <Route path=":id" element={<Property />} />
                  <Route path="new" element={<NewProperty />} />
                </Route>

                <Route path="users">
                  <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                    <Route index element={<UsersList />} />
                    <Route path="new" element={<NewUser />} />
                  </Route>
                  <Route path=":id" element={<RequireAuth matchId={true} />}>
                    <Route index element={<User />} />
                  </Route>
                </Route>

                <Route path="salesManagers">
                  <Route index element={<SalesManagersList />} />
                  <Route path=":id" element={<SalesManager />} />
                  <Route path="new" element={<NewSalesManager />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
