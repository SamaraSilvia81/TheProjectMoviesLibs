import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp,  BsWallet2,  BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { Card, CardContent, Grid, Typography, Container, CircularProgress } from '@mui/material';

import { MovieCard } from "../components/MovieCard"
import AlertMessage from '../pages/AlertMessage';

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
            setLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data);
            setTypeMessage('success');
        } catch(e){
            setTypeMessage('error');
            setLoading(false);
        } finally {
            setLoading(false); // Mudar o valor de loading para falso
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
            {movie?.length > 0 ? (
                movie.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
                loading && <CircularProgress size={24} sx={{ mr: 1 }} />
            )}
            <Container maxWidth="xl" sx={{ paddingTop: '2rem', overflow:"hidden"}}>
                <Grid container spacing={4} alignItems="center" margin="3rem 0" overflow-x="auto" >
                    <Grid container spacing={5} sx={{ alignItems: 'center', justifyContent: "center", display: 'flex', flexWrap: 'wrap'}}>
                        {movie && (
                        <>
                            <Grid item xs={12} md={4.5} sx={{order: { xs: 2, md: 1 }}}>
                                <MovieCard key={movie.id} movie={movie} showLink={false}/>
                            </Grid>
                            <Grid container spacing={5} xs={12} md={6} sx={{ flexDirection: { xs: 'column', md: 'row' }, order: { xs: 2, md: 1 }, gap:"1rem", maxWidth: "65%"}}>
                                <Typography variant="h4" component="h2" sx={{fontSize: '1.5rem', margin: "3rem 0", width: "100%"}} gutterBottom>
                                    {movie.tagline}
                                </Typography>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff", marginBottom: "1rem", flexGrow: 1 }} >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            <BsWallet2 color='#7b5eb6' fontSize="1.5rem"/> Orçamento
                                        </Typography>
                                        <Typography>
                                            {formatCurrency(movie.budget)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff", marginBottom: "1rem", flexGrow: 1 }} >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            <BsGraphUp color='#7b5eb6' fontSize="1.5rem"/> Faturamento
                                        </Typography>
                                        <Typography>
                                            {formatCurrency(movie.revenue)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff", marginBottom: "1rem", flexGrow: 1 }} >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" gutterBottom>
                                            <BsHourglassSplit color='#7b5eb6' fontSize="1.5rem"/> Duração
                                        </Typography>
                                        <Typography>{movie.runtime} minutos</Typography>
                                    </CardContent>
                                </Card>
                                <Card variant="outlined" sx={{ backgroundColor:"#2a2a2e", color: "#ffff", marginBottom: "1rem", flexGrow: 1 }} >
                                    <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        <BsFillFileEarmarkTextFill color='#7b5eb6' fontSize="1.5rem"/> Descrição
                                    </Typography>
                                    <Typography>{movie.overview}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </>
    )    
}