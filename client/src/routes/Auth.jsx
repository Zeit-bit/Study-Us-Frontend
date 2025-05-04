import {Link} from 'react-router-dom'

const Auth = () => {
  return (
    <>
      <h1>Study-Us</h1>
      <button><Link to={"/login"}>Iniciar Sesión</Link></button>
      <span>¿No tienes cuenta?<Link to={"/register"}>¡Regístrate!</Link></span>
    </>
  )
}

export default Auth;