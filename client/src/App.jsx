import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './pages/global.css'
import Auth from './pages/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import './pages/global.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App