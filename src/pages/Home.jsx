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
        <div>
           {topMovies && topMovies.map((movie) => <p>{movie.title}</p>)}
        </div>
    )
}