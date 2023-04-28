import { Outlet } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <NavBar/>
        <Outlet/>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default App;