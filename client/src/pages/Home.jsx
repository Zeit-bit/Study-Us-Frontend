import {useState, useEffect} from 'react'
import axios from "axios"

const Home = () => {
    const [tasks, setTasks] = useState([])
    const localStorageData = JSON.parse(localStorage.getItem('loggedUser'))
    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${localStorageData.id}/tasks`)
        .then(response => {setTasks(response.data); console.log(response.data)} )
    }, [localStorageData.id])

    return (
        <h1>
            Nombre de usuario: {localStorageData.userName}
            {tasks.map(t => <li key={t.id}>{t.title} : {t.description}</li>)}
        </h1>
    )
}

export default Home