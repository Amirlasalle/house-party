import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import CreateRoomPage from "./CreateRoomPage";

const Room = ({ leaveRoomCallback }) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    spotifyAuthenticated: false,
    song: {},
  });
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

  // useEffect(() => {
  //   getRoomDetails();
  //   getCurrentSong();
  //   const interval = setInterval(getCurrentSong, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          leaveRoomCallback();
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (data.is_host) {
          authenticateSpotify();
        }
      });
  };

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          spotifyAuthenticated: data.status,
        }));
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching current song:", error);
      });
  };

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, []);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      leaveRoomCallback();
      navigate("/");
    });
  };

  const updateShowSettings = (value) => {
    setShowSettings(value);
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={roomDetails.votesToSkip}
            guestCanPause={roomDetails.guestCanPause}
            roomCode={roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSettings(true)}
        >
          <SettingsIcon />
        </Button>
      </Grid>
    );
  };

  if (showSettings) {
    return renderSettings();
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>
      {song && (
        <Grid item xs={12} align="center">
          <Typography variant="h6">
            {`Title: ${song.title}, Artist: ${song.artist}`}
          </Typography>
        </Grid>
      )}
      {roomDetails.isHost ? renderSettingsButton() : null}
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          <LogoutIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Room;

{
  /* <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {roomDetails.votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {roomDetails.guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {roomDetails.isHost.toString()}
        </Typography>
      </Grid> */
}
