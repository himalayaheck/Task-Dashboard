import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, Box, IconButton } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LightMode, DarkMode } from "@mui/icons-material";
import TaskDashboard from "./components/TaskDashboard";
import CompletedTasks from "./components/CompletedTasks";
import OverdueTasks from "./components/OverdueTasks";
import PendingTasks from "./components/PendingTasks";
import Sidebar from "./components/Sidebar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#121212", 
        paper: "#424242", 
      },
      text: {
        primary: "#ffffff", 
        secondary: "#e0e0e0",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f4f5f7", 
        paper: "#ffffff", 
      },
      text: {
        primary: "#000000", 
        secondary: "#424242",
      },
    },
  });

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", height: "100vh" }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content Area */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "20px",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            {/* Toggle for Dark Mode */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
              }}
            >
              <IconButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                color="inherit"
                sx={{
                  backgroundColor: (theme) =>
                    isDarkMode ? "#424242" : "#e0e0e0",
                  borderRadius: "50%",
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>

            {/* Define Routes */}
            <Routes>
              <Route path="/" element={<TaskDashboard />} />
              <Route path="/tasks/completed" element={<CompletedTasks />} />
              <Route path="/tasks/pending" element={<PendingTasks />} />
              <Route path="/tasks/overdue" element={<OverdueTasks />} />
              <Route
                path="*"
                element={
                  <div style={{ textAlign: "center", padding: "20px" }}>
                    404 - Page Not Found
                  </div>
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
