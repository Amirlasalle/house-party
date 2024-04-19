// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Grid, Button, Typography } from "@mui/material";
// import LogoutIcon from '@mui/icons-material/Logout';
// import SettingsIcon from '@mui/icons-material/Settings';
// import CloseIcon from '@mui/icons-material/Close';
// import CreateRoomPage from "./CreateRoomPage";

// function Room(props) {
//   const { roomCode } = useParams();
//   const navigate = useNavigate();
//   const [roomDetails, setRoomDetails] = useState({
//     votesToSkip: 2,
//     guestCanPause: false,
//     isHost: false,
//     showSettings: false,
//   });

//   useEffect(() => {
//     const getRoomDetails = async () => {
//       try {
//         const response = await fetch("/api/get-room" + "?code=" + roomCode);
//         if (!response.ok) {
//           props.leaveRoomCallback();
//           navigate("/");
//           return;
//         }
//         const data = await response.json();
//         setRoomDetails({
//           votesToSkip: data.votes_to_skip,
//           guestCanPause: data.guest_can_pause,
//           isHost: data.is_host,
//         });
//       } catch (error) {
//         console.error("Error fetching room details:", error);
//       }
//     };

//     getRoomDetails();
//   }, [roomCode, props, navigate]);

//   const leaveButtonPressed = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     };
//     fetch("/api/leave-room", requestOptions)
//       .then((_response) => {
//         props.leaveRoomCallback();
//         navigate("/");
//       })
//       .catch((error) => {
//         console.error("Error leaving room:", error);
//       });
//   };

//   const updateShowSettings = (value) => {
//     setRoomDetails((prevDetails) => ({
//       ...prevDetails,
//       showSettings: value,
//     }));
//   };

//   const renderSettings = () => {
//     return (
//       <Grid container spacing={1}>
//         <Grid item xs={12} align="center">
//           <CreateRoomPage
//             update={true}
//             votesToSkip={roomDetails.votesToSkip}
//             guestCanPause={roomDetails.guestCanPause}
//             roomCode={roomCode}
//             updateCallback={getRoomDetails}
//           />
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={() => updateShowSettings(false)}
//           >
//             <CloseIcon />
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   };

//   const renderSettingsButton = () => {
//     return (
//       <Grid item xs={12} align="center">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => updateShowSettings(true)}
//         >
//           <SettingsIcon />
//         </Button>
//       </Grid>
//     );
//   };

//   if (roomDetails.showSettings) {
//     return renderSettings();
//   }

//   return (
//     <Grid container spacing={1}>
//       <Grid item xs={12} align="center">
//         <Typography variant="h4" component="h4">
//           Code: {roomCode}
//         </Typography>
//       </Grid>
//       <Grid item xs={12} align="center">
//         <Typography variant="h6" component="h6">
//           Votes: {roomDetails.votesToSkip}
//         </Typography>
//       </Grid>
//       <Grid item xs={12} align="center">
//         <Typography variant="h6" component="h6">
//           Guest Can Pause: {roomDetails.guestCanPause.toString()}
//         </Typography>
//       </Grid>
//       <Grid item xs={12} align="center">
//         <Typography variant="h6" component="h6">
//           Host: {roomDetails.isHost.toString()}
//         </Typography>
//       </Grid>
//       {roomDetails.isHost ? renderSettingsButton() : null}
//       <Grid item xs={12} align="center">
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={leaveButtonPressed}
//         >
//          Leave Room <LogoutIcon />
//         </Button>
//       </Grid>
//     </Grid>
//   );
// }

// export default Room;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import CreateRoomPage from "./CreateRoomPage";

const Room = ({ leaveRoomCallback }) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoomDetails();
  }, []);

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
      });
  };

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
      <Grid item xs={12} align="center">
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
      </Grid>
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
