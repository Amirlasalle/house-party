import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';

const RoomJoinPage = () => {
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
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4" className="font-bold">
          Join A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <TextField
          error={error}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomCode}
          helperText={error ? "Room not found" : ""}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" className="bg-link mx-1 rounded-lg text-white hover-bright-lg" onClick={roomButtonPressed} >
         Join  {" "}
          <LoginIcon />{" "}
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
      <Button variant="contained" className="bg-danger mx-1 my-2 rounded-lg text-white hover-bright-lg" to="/" component={Link}>
          {" "}
          <ArrowBackIcon /> {" "} Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default RoomJoinPage;
