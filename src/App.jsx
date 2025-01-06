import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp';
import Login from './Components/Login'
import Forgot from './Components/Forgot'
import Reset from './Components/Reset'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Router>
          <Routes>
          <Route path='/' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgot' element={<Forgot/>} />
          <Route path='/reset' element={<Reset/>} />

          </Routes>
        </Router>
    </>
  )
}

export default App
