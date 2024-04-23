import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Grid, Button, Typography, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import HomeIcon from "@mui/icons-material/Home";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

const Info = (props) => {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return "Join Page";
  }
  function createInfo() {
    return "Create Page";
  }

  useEffect(() => {
    console.log("ran");
    return () => console.log("cleanup");
  });

  return (
    <Grid container spacing={3}>
      <Grid
        container
        spacing={6}
        className="flex flex-col justify-center items-center"
      >
        <Grid item xs={4} align="center">
          <Button
            to="/"
            component={Link}
            className="bg-link mx-1 text-white btn-circle hover-bright-lg"
          >
            <HomeIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is Party Rock ?
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Info;
