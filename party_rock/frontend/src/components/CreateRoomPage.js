import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Collapse,
} from "@mui/material";
import { pink, white } from "@mui/material/colors";
import Alert from "@mui/material/Alert";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpgradeIcon from "@mui/icons-material/Upgrade";

const CreateRoomPage = ({
  votesToSkip: initialVotesToSkip = 2,
  guestCanPause: initialGuestCanPause = true,
  update = false,
  roomCode = null,
  updateCallback = () => {},
}) => {
  const [guestCanPause, setGuestCanPause] = useState(initialGuestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(initialVotesToSkip);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    setGuestCanPause(e.target.value === "true" ? true : false);
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code))
      .catch((error) => setErrorMsg("Error creating room..."));
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setSuccessMsg("Room updated successfully!");
        } else {
          setErrorMsg("Error updating room...");
        }
        updateCallback();
      })
      .catch((error) => setErrorMsg("Error updating room..."));
  };

  const renderCreateButtons = () => {
    return (
      <Grid
        container
        spacing={3}
        alignItems="center"
        className="flex flex-col items-center justify-center bg-dark rounded-lg pr-4 "
      >
        <Grid item xs={12} align="center">
          <Button
            className="bg-spotify-green mx-1 rounded-lg text-white hover-bright-lg "
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            className="bg-danger mx-1 my-2 rounded-lg text-white hover-bright-lg"
            variant="contained"
            to="/"
            component={Link}
          >
            <ArrowBackIcon /> Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <Grid
        item
        xs={12}
        align="center"
        className="flex flex-col items-center justify-center mr-4 bg-dark"
      >
        <Button
          className="bg-spotify-green mx-1 rounded-lg text-white hover-bright-lg "
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room <UpgradeIcon />
        </Button>
      </Grid>
    );
  };

  const title = update ? "Update Room" : "Create a Room";

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      className="flex flex-col items-center justify-center bg-dark rounded-lg pr-4 "
    >
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {successMsg !== "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMsg("");
              }}
            >
              {successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMsg("");
              }}
            >
              {errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4" className="text-white">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl align="center" component="fieldset">
          <FormHelperText align="center">
            <div align="center" className="text-default">
              Guest Control of Playback State
            </div>
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
            align="center"
          >
            <FormControlLabel
              value="true"
              control={
                <Radio
                  sx={{
                    color: "#1ed760",
                    "&.Mui-checked": {
                      color: "#1ed760",
                    },
                  }}
                  className=" p-0 my-2"
                />
              }
              label="Play/Pause"
              labelPlacement="bottom"
              className="text-white"
            />
            <FormControlLabel
              value="false"
              control={
                <Radio
                  sx={{
                    color: "#1ed760",
                    "&.Mui-checked": {
                      color: "#1ed760",
                    },
                  }}
                  className=" p-0 my-2"
                />
              }
              label="No Control"
              labelPlacement="bottom"
              className="text-white"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            color="success"
            focused
            margin="dense"
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{
              min: 1,
              style: { textAlign: "center", color:"white" },
            }}
          />
          <FormHelperText align="center" className="text-default">
            Votes Required To Skip Song
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        align="center"
        className="flex flex-col items-center justify-center bg-dark rounded-lg ml-4 "
      >
        {update ? renderUpdateButtons() : renderCreateButtons()}
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
