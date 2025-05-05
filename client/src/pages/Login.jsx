import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import './login.css';  // Asegúrate de importar el CSS correspondiente

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
      const data = (await axios.post('http://localhost:3000/login', userData)).data;
      if (data.error) return setModalInfo({ msg: data.error, btnMsg: "Volver a intentar" });
      setModalInfo({ msg: `Bienvenido ${data.userName}`, btnMsg: "Ir a inicio", toPath: `/${data.userName}/inicio` });
    } catch (err) {
      setModalInfo({ msg: err.name, btnMsg: "Volver a intentar" });
    }
  };

  return (
    <div className="login-wrapper">
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
      {modalInfo.msg ? <Modal msg={modalInfo.msg} btnMsg={modalInfo.btnMsg} toPath={modalInfo.toPath} onClose={() => resetFields()} /> : null}
    </div>
  );
};

export default Login;