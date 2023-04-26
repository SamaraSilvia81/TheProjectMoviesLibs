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
                Olá! Eu sou Samara. Eu tenho 19 anos e já fazem quase 2 anos que estou atuando na área de programação.
                A cada dia que passa eu vou me superando e amando tecnologia cada vez mais. Por agora eu estou mais apegada ao front, mas também aprecio o back-end.
                <br /><br />
                No que diz respeito, ao projeto <span style={{color: '#7b5eb6'}}>Movies Library</span> ele, como o próprio nome já diz, é uma biblioteca de filmes dos mais variados gêneros. Nesse site, o usuário pode pesquisar por seu filme, visualizar os considerados Top 10, vê detalhes dos filmes e muito mais.
                <br /><br />
                O objetivo é proporcionar um ambiente de diversão e ao mesmo tempo entretenimento. Espero que gostem!!!
              </Typography>
              <Button
                sx={{ 
                  backgroundColor: "#653DB6", 
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