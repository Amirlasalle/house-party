import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import SkipPreviousRoundedIcon from "@mui/icons-material/SkipPreviousRounded";
import Image from "@mui/icons-material/Image";

const MusicPlayer = (props) => {
  const songProgress = (props.time / props.duration) * 100;

  const [isClicked, setIsClicked] = useState(false);

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  };

  const prevSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/prev", requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);
  };

  const handleClickShrink = () => {
    if (isClicked) {
      return { transform: "scale(0.95)" };
    } else {
      return { transform: "scale(1)" };
    }
  };

  return (
    <> 
    <div className="w-100 flex items-center justify-center">
    <Typography variant="p" component="p" className="text-default items-center justify-center font-light smaller">
      Votes to skip: {props.votes} / {props.votes_required}
    </Typography>
  </div>
    <Card className="my-2 bg-dark rounded-lg">
      <Grid
        container
        alignItems="center"
        className="my-2 bg-dark rounded-lg justify-center"
      >
        <Grid item align="center" xs={8}>
          <img
            align="center"
            src={props.image_url}
            width="85%"
            height="85%"
            alt={Image}
            className="rounded-lg"
          />
        </Grid>

        <Grid item xs={8} align="center">
          <Typography
            component="h6"
            variant="h6"
            className="mt-2 text-white font-semibold"
          >
            {`${props.title} `}
          </Typography>
          <Typography component="p" variant="p" className="small text-default">
            {props.artist}
          </Typography>
          <div className="my-2">
            <IconButton onClick={() => prevSong()}>
              <SkipPreviousRoundedIcon
                className="text-default hover-text-white"
                fontSize="large"
              />
            </IconButton>
            <IconButton
              className={`bg-white mx-2 rounded-full ${
                isClicked ? "hover-shrink" : "hover-grow"
              }`}
              onClick={() => {
                props.is_playing
                  ? (pauseSong(), handleClick())
                  : (playSong(), handleClick());
              }}
              style={{
                ...handleClickShrink(),
                transition: "transform 0.3s ease",
              }}
            >
              {props.is_playing ? (
                <PauseIcon className="text-black" />
              ) : (
                <PlayArrowRoundedIcon className="text-black" />
              )}
            </IconButton>
            <IconButton onClick={() => skipSong()}>
              <SkipNextRoundedIcon
                className="text-default hover-text-white "
                fontSize="large"
              />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" color="secondary" value={songProgress} />
    </Card>
    </>
  );
};

export default MusicPlayer;
