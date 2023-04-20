import { useState, useEffect} from "react"

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const movieIMG = import.meta.env.VITE_IMG;

export const Home = () => {

    const [topMovies,setTopMovies] = useState([])
    
    // Vai fazer uma requisição
    const getTopRatedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setTopMovies(data.results);
    }

    // É chamado quando a página renderiza
    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?api_key=${apiKey}`
        getTopRatedMovies(topRatedURL)
    },[])

    // <img src={`${movieIMG}${movie.poster_path}`}
    // <p>{movie.title}</p>

    return ( 
        <div className="container">
            <h2 className="title">Melhores Filmes:</h2>
            <div className="movies-container">
            {topMovies.length === 0 && <p>Carregando...</p>}
            {topMovies.length > 0 && topMovies.map((movie) => <p>{movie.title}</p>)}
            </div>
        </div>
    )
}