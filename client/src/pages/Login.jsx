import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import './login.css'; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalInfo, setModalInfo] = useState({});

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setModalInfo({});
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    let userData = {
      email: email,
      password: password,
    };
    try {
      const data = (await axios.post('http://localhost:3000/api/users/login', userData)).data;
      window.localStorage.setItem('loggedUser', JSON.stringify(data))
      setModalInfo({ msg: `Bienvenido ${data.username}`, btnMsg: "Ir a inicio", toPath: '/home' });
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Error desconocido';
      setModalInfo({ msg: errorMsg, btnMsg: "Volver a intentar" });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <h1 className="login-logotext">Study-Us</h1>
        <div className="login-container">
          <h1 className="login-title">Inicio de Sesión</h1>
          <form onSubmit={sendRequest}>
            <input
              type="email"
              placeholder="Correo electronico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-button">Iniciar Sesión</button>
          </form>
          <p>¿No tienes cuenta? <Link to={"/register"} className="login-link">¡Regístrate!</Link></p>
        </div>
      </div>
      {modalInfo.msg ? <Modal msg={modalInfo.msg} btnMsg={modalInfo.btnMsg} toPath={modalInfo.toPath} onClose={() => resetFields()} /> : null}
    </div>
  );
};

export default Login;