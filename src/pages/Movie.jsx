import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUpIcon,  BsWallet2,  BsHourglassSplit,  BsFullFileEarmarkeTextFill} from 'react-icons/bs';

import { MovieCard } from "../components/MovieCard"

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {

    const [searchParams] = useSearchParams()
    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

    // Vai fazer uma requisição
     const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    }

    // É chamado quando a página renderiza
    useEffect(() => {
        const searchWithQuery = `${searchURL}?api_key=${apiKey}&query=${query}`
        getSearchedMovies(searchWithQuery)
    },[query])

    return ( 
        <div className="container">
            <BsGraphUpIcon />
            <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
            <div className="movies-container">
            {movies.length === 0 && <p>Carregando...</p>}
            {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
            </div>
        </div>
    )
}