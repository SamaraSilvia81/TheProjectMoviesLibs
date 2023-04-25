import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';

export const About = () => {

    const [user, setUser] = useState({avatar:''})

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://api.github.com/users/samarasilvia21')
        const data = await response.json();
        console.log("DATAS: ", data);
        setUser({
          avatar: data.avatar_url
      });
    }
    fetchData();
    },[]);

  return (

    <section id='about' sx={{ bgcolor: '#8B5CF6', py: { xs: 6, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src={user.avatar}
              alt="Profile Github"
              style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: '2rem' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              <Typography variant="h4" component="h2" color="#ffff" gutterBottom>
                Samara Silvia
              </Typography>
              <Typography variant="h6" component="h3" color="#ffff" gutterBottom>
                Freelance Frontend Web Developer
              </Typography>
              <hr style={{ opacity: 0.5, margin: '1.5rem 0' }} />
              <Typography variant="body1" color="#ffff" gutterBottom>
                Olá! Eu sou Samara. Eu tenho 19 anos e já fazem quase 2 anos que estou atuando na área de programação.
                A cada dia que passa eu vou me superando e amando tecnologia cada vez mais. Por agora eu estou mais apegada ao front, mas também aprecio o back-end.
                <br /><br />
                Sobre o meio acadêmico, eu estou caminhando para o 4° período da minha graduação. Eu faço Sistemas para Internet na Universidade Católica de Pernambuco, por meio da bolsa de estudos do programa Embarque Digital.
                <br /><br />
                Esse portfólio é resultado de um projeto passado para compor minha nota final. Espero que gostem!!!
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
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};