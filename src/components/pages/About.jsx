import { Container, Grid, Typography, Button } from '@mui/material';

export const About = () => {

  return (

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={'https://user-images.githubusercontent.com/100232025/234586000-602890bc-ccb6-4d0e-8469-2e094f284d4a.png'}
              alt="ProfileMe"
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Typography variant="h4" component="h2" color="#ffff" gutterBottom>
                Samara Silvia
              </Typography>
              <Typography variant="h6" component="h3" color="#7b5eb6"  sx={{ fontStyle: 'italic' }} gutterBottom>
                Freelance Frontend Web Developer
              </Typography>
              <hr style={{ opacity: 0.5, margin: '1.5rem 0' }} />
              <Typography variant="body1" color="#ffff" gutterBottom>
                HI! What's Up ?? I am Samara. I'm 19 years old and it's been almost 2 years since I've been working in the programming area.
                With each passing day I am surpassing myself and loving technology more and more. For now I'm more attached to the front, but I also appreciate the back end.
                <br /><br />
                As far as the project is concerned, <span style={{color: '#7b5eb6'}}>Movies Library</span> it, as its name implies, is a library of films of the most varied genres. On this site, the user can search for your movie, view the considered Top 10, see details of the movies and more.
                <br /><br />
                The goal is to provide an environment of fun and at the same time entertainment. Hope you enjoy!!!
              </Typography>
              <Button
                sx={{ 
                  backgroundColor: "#653DB6", 
                  marginTop: 3,
                  minWidth: 200, 
                  '&:hover': { 
                    backgroundColor: '#7b5eb6', 
                    color: "#ffff",
                    transition: 'all 0.3s ease-in-out',
                    transform: 'scale(1.05)'
                  }
                }}
                variant="contained"
                size="large"
                component="a"
                href="/movies/"
              >
                Movies
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
  );
};