import React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Brightness4Icon from "@mui/icons-material/Brightness4";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {pathname === "/new" ? (
            <Typography variant="h4" color="text.secondary">
              Add Task
            </Typography>
          ) : (
            <>
              <Typography
                variant="h4"
                color="text.secondary"
                sx={{ flexGrow: 1 }}
              >
                Tasks
              </Typography>
              <IconButton
                size="large"
                color="inherit"
                aria-label="dark-mode"
                sx={{ mr: 1 }}
              >
                <Brightness4Icon color="secondary" />
              </IconButton>
              <IconButton size="large" aria-label="add-task" sx={{ mr: -2 }}>
                <Link to="/new" role="button">
                  <AddIcon color="secondary" />
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
