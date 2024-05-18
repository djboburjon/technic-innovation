import React from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Navbar from './components/navbar/Navbar'
import Services from './pages/services/Services'
import Loading from './components/loading/Loading'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<Services/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App