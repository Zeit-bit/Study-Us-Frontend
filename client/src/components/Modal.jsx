import { Link } from 'react-router-dom';
import './Modal.css';

const Modal = ({ msg, btnMsg, toPath, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h1>{msg}</h1>
        {toPath ? (
          <Link to={toPath}><button>{btnMsg}</button></Link>
        ) : (
          <button onClick={onClose}>{btnMsg}</button>
        )}
      </div>
    </div>
  );
};

export default Modal;