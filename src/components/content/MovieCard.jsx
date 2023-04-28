import * as React from 'react';

import { Link } from "react-router-dom"
import { FaStar } from 'react-icons/Fa'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const imageURL = import.meta.env.VITE_IMG;

export function MovieCard({movie, showLink = true}) {
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        margin: "0 2rem 5rem",
        '&:hover': {
          transition: 'all 0.3s ease-in-out',
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={imageURL + movie.poster_path}
          alt={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FaStar color="#7b5eb6"/> {movie.vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      {showLink && <Link to={`/movie/${movie.id}`}>
        <Button 
          sx={{backgroundColor: '#653DB6', width: '20em', height: '3em', marginLeft: '2em', '&:hover': { backgroundColor: '#7b5eb6'}
          }}
          size="small" 
          variant="contained" 
          color="primary"
        >
          Detalhes
        </Button>
      </Link>}
      </CardActions>
    </Card>
  );
}