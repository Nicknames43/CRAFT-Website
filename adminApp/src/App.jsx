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
import Prefetch from "./components/Prefetch"
import PersistLogin from "./pages/login/PersistLogin"

import Test from "./pages/Test"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />

        <Route path="/test" element={<Test />} />

        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Landing />} />

              <Route path="properties">
                <Route index element={<PropertiesList />} />
                <Route path=":id" element={<Property />} />
                <Route path="new" element={<NewProperty />} />
              </Route>

              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<User />} />
                <Route path="new" element={<NewUser />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
