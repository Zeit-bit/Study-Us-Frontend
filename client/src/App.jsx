import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './pages/Auth'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/:id/inicio' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App