import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { MovieCard } from "../components/MovieCard"
import { Grid, Typography } from '@mui/material';

import AlertMessage from '../pages/AlertMessage';

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

export const Search = () => {

    const [searchParams] = useSearchParams()
    const [movies, setMovies] = useState([])
    const query = searchParams.get("q")

    const [typeMessage, setTypeMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Vai fazer uma requisição
     const getSearchedMovies = async (url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
            setTypeMessage('success');
        } catch (error) {
            setTypeMessage('error');
        }
    }

    // É chamado quando a página renderiza
    useEffect(() => {
        const searchWithQuery = `${searchURL}?api_key=${apiKey}&query=${query}`
        getSearchedMovies(searchWithQuery)
    },[query])

     // Configura a mensagem de sucesso
     useEffect(() => {
        if (movies.length > 0) {
            const timer = setTimeout(() => setShowSuccessMessage(false), 600);
            setShowSuccessMessage(true);
            return () => clearTimeout(timer);
        }
    }, [movies]);

    return ( 
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {typeMessage === 'error' && <AlertMessage severity="error" message="Erro ao buscar filmes" sx={{width: "12px"}}/>}
                {showSuccessMessage && <AlertMessage severity="success" message="Filmes encontrados com sucesso." />}
                {movies.length === 0 && <AlertMessage severity="warning" message="Nenhum filme encontrado" />}
                <Typography variant="h2" gutterBottom sx={{color:"aliceblue", fontSize: "2rem", textAlign: "center", margin: "4rem 0 1rem"}}>
                    Resultados para: <span style={{color:"#7b5eb6"}}>{query}</span>
                </Typography>
            </Grid>
            <Grid 
            item xs={12} 
            sx={{ 
                display: "flex", 
                flexWrap: "wrap", 
                justifyContent: 'center', 
                padding: "2rem", 
                maxWidth: "1200px", 
                margin: "2 auto" 
            }}>
                {movies.length > 0 &&
                movies.map((movie) => 
                <MovieCard key={movie.id} movie={movie} /> )}
            </Grid>
        </Grid>
    )
}