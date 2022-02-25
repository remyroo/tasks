import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", padding: "25vh 0" }}>
      <Typography variant="h4">Oops! Page Not Found</Typography>
      <Link to="/" data-cy="urlHome">
        <Typography>Back to the Homepage</Typography>
      </Link>
    </Box>
  );
};

export default NotFound;
