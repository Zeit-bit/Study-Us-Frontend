import { useParams } from "react-router-dom"

const Home = () => {
    let params = useParams()
    return (
        <h1>
            Inicio de usuario: {params.id}
        </h1>
    )
}

export default Home