import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const sendRequest = async (e) => {
    e.preventDefault()
    let userData = {
      email: email,
      password: password
    }
    console.log("Enviando al back", userData)
    try {
      const res = await axios.post('http://localhost:3000/login', userData)
      console.log("Recibiendo del back", res)
      if (res.data.error) return alert(res.data.error)
      alert(`Login exitoso, Bienvenido ${res.data.userName}`)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
    <h1>Inicio de Sesión</h1>
    <form onSubmit={sendRequest}>
      <input type="text" placeholder="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <Link to={"/register"}>No tengo cuenta</Link>
    </>
  )
}

export default Login;