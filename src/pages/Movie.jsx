import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp,  BsWallet2,  BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { Card, CardContent, Grid, Typography, Button, CircularProgress } from '@mui/material';

import { MovieCard } from "../components/MovieCard"
import AlertMessage from '../pages/AlertMessage';

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {

    const {id} = useParams()
    const [movie, setMovie] = useState(null)

    const [typeMessage, setTypeMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [loading, setLoading] = useState(true);

    const getMovie = async (url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data);
            setTypeMessage('success');
            setLoading(false);
        } catch(e){
            setTypeMessage('error');
            setLoading(false);
        }
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

    // Configura a mensagem de sucesso
    useEffect(() => {
        if (movie) {
            const timer = setTimeout(() => setShowSuccessMessage(false), 600);
            setShowSuccessMessage(true);
            return () => clearTimeout(timer);
        } 
    }, [movie]);

    return ( 
        <>
            {typeMessage === 'error' && <AlertMessage severity="error" message="Erro ao buscar filmes. Tente novamente mais tarde."/>}
            {typeMessage === 'success' && showSuccessMessage && <AlertMessage severity="success" message="Filme carregado com sucesso."/>}
            {!movie && <AlertMessage severity="warning" message="Nenhum detalhe de filme encontrado" />}
            <Grid container spacing={4} alignItems="center">
            <div className="movie-page">
                <div className="movie-details-container">
                    {movie && (
                    <>
                        <Grid item xs={6} sx={{marginTop: '0.5rem'}}>
                            <MovieCard key={movie.id} movie={movie} showLink={false}/>
                        </Grid>
                        <Grid container spacing={2} sx={{ display:"flex", flexDirection: "column", gap: "1rem"}}>
                            <Grid item xs={12}>
                                <Typography variant="h4" component="h2" sx={{fontSize: '1.5rem'}} gutterBottom>
                                    {movie.tagline}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff",marginBottom: "1rem", width: '400%'}} >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                        <BsWallet2/> Orçamento
                                        </Typography>
                                        <Typography>
                                        {formatCurrency(movie.budget)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff",marginBottom: "1rem", width: '400%'}} >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                        <BsGraphUp/> Faturamento
                                        </Typography>
                                        <Typography>
                                        {formatCurrency(movie.revenue)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff",marginBottom: "1rem", width: '400%'}} >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                        <BsHourglassSplit/> Duração
                                        </Typography>
                                        <Typography>{movie.runtime} minutos</Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff", marginBottom: "1rem", width: '400%'}} >
                                    <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        <BsFillFileEarmarkTextFill/> Descrição
                                    </Typography>
                                    <Typography>{movie.overview}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>          
                        </Grid>
                        </>
                    )}
                </div>
            </div>
            </Grid>
        </>
    )    
}