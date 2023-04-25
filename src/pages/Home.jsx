import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProductHeroLayout from './LayoutHome';

const images = [
  'https://images6.alphacoders.com/673/673797.jpg',
  'https://images6.alphacoders.com/311/311266.jpg',
  'https://images7.alphacoders.com/671/671281.jpg',
  'https://images5.alphacoders.com/744/744742.jpg',
  'https://images8.alphacoders.com/669/669878.jpg',
  'https://images6.alphacoders.com/714/714381.jpg',
  /*'https://images.unsplash.com/photo-1534684686641-05569203ecca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80&w=1400',
  'https://plus.unsplash.com/premium_photo-1667538962342-2d9937f014d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80&w=1400',
  'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80&w=1400'*/
];

export const Home = () => {
  const [currentImage, setCurrentImage] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentImage]);

  const backgroundImageStyle = {
    backgroundImage: `url(${images[currentImage]})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
  };

  return (
    <ProductHeroLayout sxBackground={backgroundImageStyle}>
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Movies Library
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        "The first rule of Fight Club is: You do not talk about Fight Club."
      </Typography>
      <Button
        sx={{ backgroundColor: "#653DB6", minWidth: 200, '&:hover': { backgroundColor: '#7b5eb6', color: "#ffff" } }}
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
    </ProductHeroLayout>
  );
}