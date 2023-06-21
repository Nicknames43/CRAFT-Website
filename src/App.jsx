import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import NavBar from './components/NavBar.jsx'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={Home()}/>
      </Routes>
    </>
  )
}

export default App
