import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { orange, grey } from "@mui/material/colors";
import Navbar from "./Navbar";
import NotFound from "./NotFound";
import TaskForm from "./TaskForm";
import TaskHome from "./TaskHome";

const TaskApp = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode === true
        ? {
            primary: {
              main: orange[900],
            },
            secondary: {
              main: grey[600],
            },
            text: {
              primary: grey[300],
              secondary: grey[400],
              disabled: grey[500],
            },
            background: {
              default: "#001E3C",
              paper: orange[900],
            },
          }
        : {
            primary: {
              main: orange[800],
            },
            secondary: {
              main: grey[300],
            },
            text: {
              primary: grey[800],
              secondary: grey[700],
              disabled: grey[600],
            },
            background: {
              paper: orange[800],
            },
          }),
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        elevation={0}
        sx={{
          height: 60,
          marginBottom: 3,
        }}
        data-cy="banner"
      />
      <Container>
        <Navbar toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<TaskHome />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default TaskApp;
