import React, { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Room() {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => { 
    getRoomDetails(roomCode);
  }, [roomCode]);

  const getRoomDetails = (code) => {
    fetch("/api/get-room?code=" + code)
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      })
      .catch((error) => {
        console.error("Error fetching room details:", error);
      });
  };

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions)
      .then((_response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h5" component="h5">
          Room Code: {roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="p" component="p">
          Votes: {roomDetails.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="p" component="p">
          Guest Can Pause: {roomDetails.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="p" component="p">
          Host: {roomDetails.isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room <LogoutIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
