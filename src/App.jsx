import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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