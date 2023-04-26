import { useState, useEffect} from "react"
import { MovieCard } from "../components/MovieCard";
import { Grid, Typography } from '@mui/material';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movies = () => {

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

    return ( 
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom sx={{color:"aliceblue", fontSize: "2rem", textAlign: "center", margin: "4rem 0 1rem"}}>
                Top 10 Melhores Filmes
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
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 &&
                topMovies.map((movie) => 
                <MovieCard key={movie.id} movie={movie} /> )}
            </Grid>
        </Grid>
    )
}