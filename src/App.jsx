import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/index.jsx'
import About from './pages/About/index.jsx'
import Services from './pages/Services/index.jsx'
import Properties from './pages/PropertiesMain/index.jsx'
import Contact from './pages/Contact/index.jsx'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={Home()}/>
        <Route path='/About' element={About()}/>
        <Route path='/Services' element={Services()}/>
        <Route path='/Properties' element={Properties()}/>
        <Route path='/Contact' element={Contact()}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
