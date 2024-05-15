import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import DashLayout from "./components/DashLayout"
import Login from "./pages/login"
import Landing from "./pages/landing"
import PropertiesList from "./pages/properties"
import UsersList from "./pages/users"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Landing />} />

          <Route path="properties">
            <Route index element={<PropertiesList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
