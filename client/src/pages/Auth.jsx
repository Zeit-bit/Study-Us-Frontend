import { Link } from 'react-router-dom'
import './Auth.css'

const Auth = () => {
  return (
    <div className="auth-landing">
      <header className="auth-header">
        <h1 className="auth-logo">Study-Us</h1>
        <div>
          <Link to="/login" className="auth-nav-button">Iniciar Sesión</Link>
          <Link to="/register" className="auth-nav-button secondary">Registrarse</Link>
        </div>
      </header>

      <main className="auth-main">
        <h2 className="auth-tagline">Haz que tu día a día esté en orden.</h2>
        <p className="auth-description">
          "El universo tiende al caos, pero con nosotros, tu mundo permanecerá organizado."
        </p>
        <Link to="/register" className="auth-cta">Comienza ahora</Link>
      </main>
    </div>
  )
}

export default Auth