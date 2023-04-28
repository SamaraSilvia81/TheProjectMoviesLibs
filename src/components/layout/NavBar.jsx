import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 20,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export function NavBar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search) return 

    navigate(`/search?q=${search}`);
    setSearch("")
  }

  const navigateToPage = (page) => {
    if (page === "Home") {
      navigate("/");
    } else if (page === "About") {
      navigate("/about");
    } else if (page === "Movies") {
      navigate("/movies");
    } else {
      // navigate to other pages as usual
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const pages = ["Home", "About", "Movies"];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <AppBar position="static" sx = {{ background: "#23232e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Avatar 
            sx={{width: "8em", height:'5em', paddingBottom: 3}}
            alt="Logo" 
            src='https://user-images.githubusercontent.com/100232025/234320289-852956b7-48ec-4546-88f3-9c0ead9b3821.png' 
          />
        </Typography>
        
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} sx={{'&:hover':{
                  backgroundColor: "rgba(0, 0, 0, 0.08)"
                }}} onClick={() => navigateToPage(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <Avatar 
              sx={{width: "8em", height: '5em',paddingBottom: 3}}
              alt="Logo" 
              src='https://user-images.githubusercontent.com/100232025/234320289-852956b7-48ec-4546-88f3-9c0ead9b3821.png' 
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateToPage(page)}
                sx={{ my: 2, color: 'white', display: 'block',
                '&:hover': {
                  backgroundColor: "rgba(0, 0, 0, 0.15)" // "#653DB6" ou rgba(101, 61, 182, 0.25)
                }}}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Search>
            <form onSubmit={handleSubmit}>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </form>
          </Search>

          <Box sx={{ flexGrow: 0 }}>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="ProfileGithub" src={user.avatar} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}