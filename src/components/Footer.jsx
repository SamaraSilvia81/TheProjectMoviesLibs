import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffff',
  mr: 1,
  '&:hover': {
    color: '#7b5eb6',
  },
};

export function Footer() {
  return (
    <Box sx={{ boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)' }}>
    <Typography
      component="footer"
       position="static"
      sx={{ display: 'flex', backgroundColor: "#23232e", py: 6 }}
    >
      <Container sx={{ my: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={3} sx={{ flexGrow: 1, alignItems: 'center' }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar
                sx={{ width: '13em', height: '5em', paddingBottom: 3 }}
                alt="Logo"
                src="https://user-images.githubusercontent.com/100232025/234320289-852956b7-48ec-4546-88f3-9c0ead9b3821.png"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography variant="body2" align="center" color="#fffff">
                {'© '}
                <Link color="inherit" href="/">
                  Your Website
                </Link>{' '}
                {new Date().getFullYear()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Grid container justifyContent="center" spacing={1}>
                <Grid item>
                  <Box component="a" href=";" sx={iconStyle}>
                    <GitHubIcon/>
                  </Box>
                </Grid>
                <Grid item>
                  <Box component="a" href="https://twitter.com/MUI_hq" sx={iconStyle}>
                    <LinkedInIcon/>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Typography>
    </Box>
  );
}