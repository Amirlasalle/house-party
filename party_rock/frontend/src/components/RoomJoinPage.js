import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const RoomJoinPage = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1ed760', 
      },
    },
  });
  

  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(false);
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      spacing={3}
      className="mt-5 bg-dark  flex flex-col justify-center items-center rounded-lg w-100  pb-5 pt-5 pr-5"
    >
      <Grid item xs={12} align="center">
        <Typography
          variant="h4"
          component="h4"
          className="font-bold text-white"
        >
          Join A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
      <ThemeProvider theme={theme}>
        <TextField
          color="primary"
          focused
          margin="dense"
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error ? "Room not found" : ""}
          variant="outlined"
          onChange={handleTextFieldChange}
          inputProps={{
          style: { color: "white" }
          }}
    
        />
            </ThemeProvider>

      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          className="bg-spotify-green mx-1 rounded-lg text-white hover-bright-lg"
          onClick={roomButtonPressed}
        >
          Join <LoginIcon />{" "}
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          className="bg-danger mx-1 my-2 rounded-lg text-white hover-bright-lg"
          to="/"
          component={Link}
        >
          {" "}
          <ArrowBackIcon /> Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
