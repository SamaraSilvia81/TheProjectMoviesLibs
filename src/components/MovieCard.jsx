import * as React from 'react';

import { Link } from "react-router-dom"
import { FaStar } from 'react-icons/Fa'

const imageURL = import.meta.env.VITE_IMG;

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export function MovieCard({movie, showLink = true}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
            <FaStar/> {movie.vote_average}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </Button>
      </CardActions>
    </Card>
  );
}