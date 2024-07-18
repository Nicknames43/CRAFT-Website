import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home/index.jsx"
import { About } from "./pages/About/index.jsx"
import { Services } from "./pages/Services/index.jsx"
import { Properties } from "./pages/Properties/index.jsx"
import { Contact } from "./pages/Contact/index.jsx"
import { PropertyInfo } from "./pages/PropertyInfo/index.jsx"
import { PrivacyPolicy } from "./pages/PrivacyPolicy/index.jsx"
import NavBar from "./components/NavBar.jsx"
import Footer from "./components/Footer.jsx"
import "./assets/main.scss"

function App() {
  const [loading, setLoading] = useState(true)
  const [properties, setProperties] = useState(null)

  useEffect(() => {
    fetch("/data/properties.json")
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw res
      })
      .then((data) => {
        setProperties(data)
      })
      .catch((err) => {
        console.error("Error fetching data: ", err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div style={{ overflowX: "hidden" }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route
          path="/Properties"
          element={<Properties properties={properties} />}
        />
        <Route
          path="/Properties/:property"
          element={<PropertyInfo properties={properties} />}
        />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Privacy_Policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
