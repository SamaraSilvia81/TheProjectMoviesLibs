import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductHeroLayout from './LayoutHome';

const imageURL = import.meta.env.VITE_IMG_SLINK;
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {

  const [movies, setMovies] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % movies.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImage, movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`${imageURL}api_key=${apiKey}`);
      const data = await response.json();
      const moviesWithTagline = await Promise.all(
        data.results.map(async (movie) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=en-US`
          );
          const data = await response.json();
          return {
            ...movie,
            tagline: data.tagline,
          };
        })
      );
      setMovies(moviesWithTagline);
    };    
    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
  };

  const HeroText = () => (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Movies Library
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        {movies[currentImage]?.tagline ? movies[currentImage].tagline : 'Seja bem-vindo a um mundo de diversão e entretenimento'}
      </Typography>
      <Button
        sx={{
          backgroundColor: '#653DB6',
          minWidth: 200,
          '&:hover': {
            backgroundColor: '#7b5eb6',
            color: '#ffff',
            transition: 'all 0.3s ease-in-out',
            transform: 'scale(1.05)',
          },
        }}
        variant="contained"
        size="large"
        component="a"
        href="/movies/"
      >
        Movies
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </div>
  );

  return (
    <div style={{ overflowX: 'hidden', overflow: "hidden"}}>
      <ProductHeroLayout sxBackground={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movies[currentImage]?.backdrop_path})` }}>
        <Slider {...sliderSettings} sx={{maxWidth: "100%"}}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                alt={movie.title}
                style={{maxWidth: "1px", height: "1px"}}
              />
            </div>
          ))}
        </Slider>
        <HeroText />
    </ProductHeroLayout>
  </div>
  );
};