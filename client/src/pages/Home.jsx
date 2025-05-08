import {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import './Home.css'

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
		<div className="navbar">
			<div className="navbar-title">Gestor de Tareas</div>
			<button className="navbar-logout-button" onClick={() => {
				localStorage.removeItem('loggedUser')
				window.location.reload()
			}}>
				Cerrar sesión
			</button>
		</div>
		<div className="home-wrapper"> 
			{localStorageData ?
			<>
				<h1 className='home-username'>Usuario: {localStorageData.username}</h1>
				<br></br>
				
				{tasks.length > 0 ? (
					<table className='home-task-table'>
						<thead>
							<tr>
								<th>Tarea</th>
								<th>Descripción</th>
								<th>Tarea Completada</th>
								<th>Eliminar Tarea</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map(t => (
								<tr key={t.id}>
									<td>{t.title}</td>
									<td>{t.description}</td>
									<td>
										<input
											type="checkbox"
											checked={t.completed}
											onChange={(e) => toggleCheckbox(t.id, e.target.checked)}
										/>
									</td>
									<td>
										<button className='delete-button' onClick={() => deleteTask(t.id)}>Eliminar</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<strong>Sin tareas</strong>
				)}

				<button className='create-task-button' onClick={() => setShowCreateTask(true)}>Crear tarea</button>

				{showCreateTask ? 
				<CreateTask localStorageData={localStorageData} onTaskCreation={(newTask) => setTasks(tasks.concat(newTask))} onClose={() => setShowCreateTask(false)}/> : null}
			</>
			:
			<> 
			<h1>Not logged in</h1>
			<Link to='/login'><button>Ir a inicio de sesión</button></Link>
			</>}
		</div>         
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
				<h1 className="modal-title">Crear Tarea</h1>
				<form className="modal-form" onSubmit={(e) => createTask(e)}>
					<label>Nombre de tarea:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
					<label>Descripción:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						cols={50}
						rows={5}
						required
					></textarea>
					<button type="submit" className="modal-submit-button">Crear</button>
				</form>
				<button className="modal-close-button" onClick={onClose}>Cerrar</button>
			</div>
		</div>
	);
};
  
export default Home