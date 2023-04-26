import { useState, useEffect } from "react";
import { MovieCard } from "../components/MovieCard";
import { Grid, Typography, Button, CircularProgress } from '@mui/material';
import AlertMessage from '../pages/AlertMessage';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movies = () => {

    const [topMovies, setTopMovies] = useState([]);

    const [typeMessage, setTypeMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [loading, setLoading] = useState(true);

    // Vai fazer uma requisição
    const getTopRatedMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setTopMovies(data.results);
            setTypeMessage('success');
            setLoading(false);
        } catch (error) {
            setTypeMessage('error');
            setLoading(false);
        }
    };

    // É chamado quando a página renderiza
    useEffect(() => {
        const topRatedURL = `${moviesURL}top_rated?api_key=${apiKey}`
        getTopRatedMovies(topRatedURL)
    },[])

    // Configura a mensagem de sucesso
    useEffect(() => {
        if (topMovies.length > 0) {
            const timer = setTimeout(() => setShowSuccessMessage(false), 600);
            setShowSuccessMessage(true);
            return () => clearTimeout(timer);
        }
    }, [topMovies]);

    return ( 
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {typeMessage === 'error' && <AlertMessage severity="error" message="Erro ao buscar filmes. Tente novamente mais tarde." sx={{width: "12px"}}/>}
                {showSuccessMessage && <AlertMessage severity="success" message="Filmes carregados com sucesso." />}
                {topMovies.length === 0 && <AlertMessage severity="warning" message="Nenhum filme encontrado" />}
                <Typography 
                    variant="h2"
                    gutterBottom 
                    sx={{
                        color:"aliceblue", 
                        fontSize: "2rem", 
                        textAlign: "center", 
                        margin: "4rem 0 1rem"}}>
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
                {loading ? (
                  <Button disabled variant="outlined" loadingPosition="start" sx={{ mt: 3, marginTop: 25}}>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                  </Button>
                ) : (
                  topMovies.map((movie) => 
                  <MovieCard key={movie.id} movie={movie} /> )
                )}
            </Grid>
        </Grid>
    )
}