import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp,  BsWallet2,  BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/Fa'
import { Card, CardContent, Grid, Typography, Container, CircularProgress } from '@mui/material';

import { MovieCard } from "../components/MovieCard"
import AlertMessage from '../pages/AlertMessage';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Movie = () => {

    const {id} = useParams()
    const [movie, setMovie] = useState(null)
    const [review, setReview] = useState(null)

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

    const getMovieReview = async (url) => {
        try {
          setLoading(true);
          const res = await fetch(url);
          const data = await res.json();
      
          if (data.errorMessage) {
            throw new Error(data.errorMessage);
          }
      
          const formattedReviews = data.results.slice(0, 1).map((review) => ({
            author: review.author,
            time: review.updated_at,
            content: review.content,
            avatar: review.author_details.avatar_path,
          }));          
      
          setReview(formattedReviews);
          setTypeMessage("success");
        } catch (e) {
          setTypeMessage("error");
        } finally {
          setLoading(false);
        }
      };
           

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

    useEffect(() => {
        const movieUrlReview = `${moviesURL}${id}/reviews?api_key=${apiKey}`
        getMovieReview(movieUrlReview)
    },[])

    // Configura a mensagem de sucesso
    useEffect(() => {
        if (movie) {
            const timer = setTimeout(() => setShowSuccessMessage(false), 600);
            setShowSuccessMessage(true);
            return () => clearTimeout(timer);
        } 
    }, [movie]);

     // Configura a mensagem de sucesso
     useEffect(() => {
        if (review) {
            const timer = setTimeout(() => setShowSuccessMessage(false), 600);
            setShowSuccessMessage(true);
            return () => clearTimeout(timer);
        } 
    }, [review]);
    

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
                                    <Typography variant="h3" component="h2" sx={{width: "100%"}}>
                                    {movie.title}
                                    </Typography>
                                    <Typography variant="h6" sx={{width: "100%"}}>
                                        <FaStar color="#7b5eb6"/> {movie.vote_average}
                                    </Typography>
                                    <Typography variant="h5" component="h2" sx={{margin: "3rem 0", width: "100%", color: "#836ab5"}} gutterBottom>
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
                    <Container maxWidth="xl" sx={{ margin: '3rem 4rem' }}>
                        <Grid container spacing={4} alignItems="center" justifyContent="center" >
                            <Card sx={{ backgroundColor: "#2a2a2e", color: "#ffff", marginBottom: "1rem", alignItems: 'center', justifyContent: "center" }} >
                                {review?.length > 0 ? (
                                    <CardContent>
                                        <Grid item xs={12} sx={{margin: "4rem 3rem"}}>
                                            <Typography variant="h4" gutterBottom sx={{ marginBottom: '2rem' }}>
                                                <BsFillFileEarmarkTextFill color='#7b5eb6' fontSize="1.5rem"/> Review
                                            </Typography>
                                            {review.map((review) => (
                                                <Grid container spacing={2} alignItems="center" justifyContent="center" key={review.id}>
                                                    <Grid item xs={12}>
                                                        <Grid container alignItems="center">
                                                            <Grid item xs={3}>
                                                                <img 
                                                                    src={`https://image.tmdb.org/t/p/w185${review.avatar}`} 
                                                                    alt={review.author} 
                                                                    style={{ 
                                                                        borderRadius: '50%', 
                                                                        width: '80%',
                                                                    }} 
                                                                />
                                                            </Grid>
                                                            <Grid item xs={9}>
                                                                <Typography variant="h5" gutterBottom>
                                                                    {review.author}
                                                                </Typography>
                                                                <Typography variant="subtitle" color="#7b5eb6" gutterBottom>
                                                                    {new Date(review.time).toLocaleString()}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="body1" sx={{textAlign:"justify"}}>
                                                            {review.content}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>    
                                    </CardContent>                          
                                ) : (<Typography variant="h6" gutterBottom color="#fff" padding="2rem"> Don't Have a Review </Typography> )}
                            </Card>
                        </Grid>
                    </Container>
                </Grid>
            </Container>
        </>
    )    
}