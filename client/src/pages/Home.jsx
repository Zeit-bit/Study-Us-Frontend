import {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [localStorageData, setLocalStorageData] = useState(null)
    const [showCreateTask, setShowCreateTask] = useState(false)
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('loggedUser'))
        setLocalStorageData(data)

        if (data?.token) {
            axios.get('http://localhost:3000/api/tasks', {headers: {Authorization: `Bearer ${data.token}`}})
            .then(response => setTasks(response.data))
            .catch(error => console.log(error))
        }
    }, [])

    const toggleCheckbox = async (taskId, checkState) => {
        await axios.put(`http://localhost:3000/api/tasks/${taskId}/update`, 
            {completed: checkState},
            {headers: {Authorization: `Bearer ${localStorageData.token}`}})
        setTasks(tasks.map(t => t.id === taskId ? {...t, completed: checkState} : t))
    }

    const deleteTask = async (taskId) => {
        await axios.delete(`http://localhost:3000/api/tasks/${taskId}/delete`, 
            {headers: {Authorization: `Bearer ${localStorageData.token}`}})
        setTasks(tasks.filter(t => t.id !== taskId ))
    }

    return (
        <>
            {localStorageData ?
            <>
                <h1>Nombre de usuario: {localStorageData.username}</h1>
                <button onClick={() => setShowCreateTask(true)}>Crear tarea</button>
                
                {(tasks.length > 0) ? 
                tasks.map(t => 
                <div key={t.id}>
                    <strong>{t.title}</strong> 
                    <br></br> 
                    <span>{t.description}</span>
                    <input type='checkbox' defaultChecked={t.completed} onChange={(e) => toggleCheckbox(t.id, e.target.checked)}/>
                    <button onClick={() => deleteTask(t.id)}>Delete</button>
                </div>) 
                : 
                <strong>Sin tareas</strong> }
                
                {showCreateTask ? 
                <CreateTask localStorageData={localStorageData} onTaskCreation={(newTask) => setTasks(tasks.concat(newTask))} onClose={() => setShowCreateTask(false)}/> : null}
            </>
            :
            <> 
            <h1>Not logged in</h1>
            <Link to='/login'><button>Ir a inicio de sesión</button></Link>
            </>}
        </>
    )
}

const CreateTask = ({onClose, localStorageData, onTaskCreation}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const createTask = async (e) => {
        e.preventDefault()
        const newTask = {
            title,
            description
        }
        const response = await axios.post('http://localhost:3000/api/tasks/create', 
            newTask, {headers: {Authorization: `Bearer ${localStorageData.token}`}})
        onTaskCreation(response.data)
    }

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h1>Crear Tarea</h1>
          <form onSubmit={(e) => createTask(e)}>
            <label>Nombre de tarea: </label>
            <br></br>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}required></input>
            <br></br>
            <label>Descripcion: </label>
            <br></br>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} cols={50} rows={5} required></textarea>
            <br></br>
            <button type='submit'>Crear</button>
          </form>
          <button onClick={onClose}>close</button>
        </div>
      </div>
    );
  };
  
export default Home