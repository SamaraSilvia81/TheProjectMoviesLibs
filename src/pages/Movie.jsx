import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { BsGraphUp,  BsWallet2,  BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';

import { MovieCard } from "../components/MovieCard"

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {

    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const getMovie = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovie(data);
    }

    const formatCurrency = (number) => {
        return number.toLocaleString("en-US",{
            style: "currency",
            currency: "USD"
        });
    };

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`
        getMovie(movieUrl)
    },[])

    return ( 
        <div className="movie-page">
            {movie && (
                <div className="movie-details-container">
                    <MovieCard key={movie.id} movie={movie} showLink={false}/>
                    <div className="movie-details">
                        <p className="tagline">{movie.tagline}</p>
                        <div className="info">
                            <h3><BsWallet2/> Orçamento</h3>
                            <p>{formatCurrency(movie.budget)}</p>
                        </div>
                        <div className="info">
                            <h3><BsGraphUp/> Faturamento</h3>
                            <p>{formatCurrency(movie.revenue)}</p>
                        </div>
                        <div className="info">
                            <h3><BsHourglassSplit/> Duração</h3>
                            <p>{movie.runtime} minutos</p>
                        </div>
                        <div className="info description">
                            <h3><BsFillFileEarmarkTextFill/> Descrição</h3>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    )    
}