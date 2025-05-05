import {Link} from 'react-router-dom'
import './Auth.css'



const Auth = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h1 className="auth-title">Study-Us</h1>
        <Link to={"/login"} className="auth-button">Iniciar Sesión</Link>
        <p className="auth-link">
          ¿No tienes cuenta?
          <Link to="/register">¡Regístrate!</Link>
        </p>
      </div>
    </div>
  )
}

export default Auth