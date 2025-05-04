import {Link} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const sendRequest = async(e) => {
    e.preventDefault()
    if (password !== confirmPassword) return alert("Las contraseñas no coinciden")
    let userData = {
      userName: userName,
      email: email,
      password: password
    }
    try {
      console.log("Enviando al back", userData)
      const res = await axios.post('http://localhost:3000/users', userData)
      console.log("Recibiendo del back", res)
      if (res.data.error) alert(res.data.error)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={sendRequest}>
        <input type="text" placeholder="Nombre de usuario" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
        <input type="text" placeholder="Correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <input type="password" placeholder="Confirma contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        <button type='submit'>Registrarme</button>
      </form>
      <Link to='/login'>Ya tengo una cuenta</Link>
    </>
  )
}

export default Register;