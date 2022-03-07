import React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useTheme from "@mui/material/styles/useTheme";

const Navbar = ({ toggleDarkMode }) => {
  const theme = useTheme();
  const { pathname } = useLocation();

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {pathname === "/new" ? (
            <Typography variant="h4" data-cy="title">
              Add Task
            </Typography>
          ) : (
            <>
              <Typography variant="h4" sx={{ flexGrow: 1 }} data-cy="title">
                Tasks
              </Typography>
              <IconButton
                size="large"
                aria-label="dark-mode"
                sx={{ mr: 1 }}
                onClick={() => toggleDarkMode()}
                data-cy="darkModeToggle"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon color="primary" />
                ) : (
                  <Brightness4Icon color="primary" />
                )}
              </IconButton>
              <IconButton size="large" aria-label="add-task" sx={{ mr: -2 }}>
                <Link to="/new" role="button" data-cy="formLink">
                  <AddIcon color="primary" />
                </Link>
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
