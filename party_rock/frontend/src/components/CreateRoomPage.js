import React, {
  Component
}
from "react";
import { Link } from 'react-router-dom'
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const CreateRoomPage = () => {
  return (
   <Grid container spacing={1}>

<Grid item xs={12} align="center">
  <Typography component='h4' variant="h4">
    Create A Room
  </Typography>
</Grid>

<Grid item xs={12} align="center">
  <FormControl component="fieldset" >
    <FormHelperText>
      <div align='center'>
        Guest Control of Playback State
      </div>
    </FormHelperText>

    <RadioGroup row defaultValue='true'>

      <FormControlLabel
      value='true'
      control={<Radio color='primary' />}
      label="Play/Pause"
      labelPlacement="bottom"
      />

<FormControlLabel
      value='false'
      control={<Radio color='secondary' />}
      label="No Control"
      labelPlacement="bottom"
      />

    </RadioGroup>
  </FormControl>
</Grid>

   </Grid>
  );
};

export default CreateRoomPage;
