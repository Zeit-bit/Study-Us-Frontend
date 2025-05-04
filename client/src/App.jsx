import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './routes/Auth'
import Login from './routes/Login'
import Register from './routes/Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App