import './App.css';
import { Home } from './pages/Home';
import "@fontsource/oxanium";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Router } from './router';
import { BrowserRouter } from 'react-router-dom';


const theme = createTheme({
  typography: {
    fontFamily: 'Oxanium, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;
