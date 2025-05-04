import {Link} from 'react-router-dom'

const Modal = ({msg, btnMsg, toPath, onClose}) => {
  return (
    <div>
      <h1>{msg}</h1>
      {toPath ? 
        <Link to={toPath}><button>{btnMsg}</button></Link>
        :
        <button onClick={onClose}>{btnMsg}</button>
      }
    </div>
  )
}

export default Modal