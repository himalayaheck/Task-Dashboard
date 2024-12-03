import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // To connect Redux with React
import store from "./store"; // Import the Redux store
import App from "./App"; // The main App component
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"; // Material UI imports

// Creating a Material UI theme (you can customize this)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", 
    },
    secondary: {
      main: "#d32f2f", 
    },
    background: {
      default: "#f4f5f7", 
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", 
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}> 
      <CssBaseline /> 
      <App /> 
    </ThemeProvider>
  </Provider>
);
