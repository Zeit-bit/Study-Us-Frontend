import {Link} from 'react-router-dom'

const Auth = () => {
  return (
    <>
      <h1>Study-Us</h1>
      <Link to={"/login"}><button>Iniciar Sesión</button></Link>
      <span>¿No tienes cuenta?<Link to={"/register"}>¡Regístrate!</Link></span>
    </>
  )
}

export default Auth;