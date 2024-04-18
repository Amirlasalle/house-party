import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CreateRoomPage = () => {

  // const [guestCanPause, setGuestCanPause] = useState(true);
  // const [votesToSkip, setVotesToSkip] = useState(1);
const [guestCanPause, setGuestCanPause] = useState(true);
const [voteToSkip, setVotesToSkip] = useState(1);

const handleVotsChange = (e) => {
  setVotesToSkip(e.target.value);
}

const handleGuestCanPauseChange = (e) => {
  setGuestCanPause(e.target.vaule === "true");
};


  // const handleRoomButtonPressed = () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       votes_to_skip: votesToSkip,
  //       guest_can_pause: guestCanPause,
  //     }),
  //   };
  //   fetch("/api/create-room", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // };


  const handleRoomButoonPressed = () => {
    const requestOptions = {
      method: "POST",
      Headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        vote_tp_skip: voteToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
  };


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText>
            <div align="center">Votes required to skip song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          <ArrowBackIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
