import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
  Navigate,
} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Typography, ButtonGroup, Button } from "@mui/material";

function HomePage() {
  const [roomCode, setRoomCode] = useState("");
 
  useEffect(() => {
    async function fetchRoomCode() {
      try {
        const response = await fetch("/api/user-in-room");
        const data = await response.json();
        setRoomCode(data.code);
      } catch (error) {
        console.error("Error fetching room code:", error);
      }
    }

    fetchRoomCode();
  }, []);

  const renderHomePage = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3" className="font-bold">
            House Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
        
            <Button  to="/join" component={Link} className="bg-link mx-1 rounded-lg text-white hover-bright-lg ">
              Join a Room
            </Button>
            <Button  to="/create" component={Link} className="bg-danger mx-1 my-2 rounded-lg text-white hover-bright-lg">
              Create a Room
            </Button>
         
        </Grid>
      </Grid>
    );
  };

  const clearRoomCode = () => {
    setRoomCode("");
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()
          }
        />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
          path="/room/:roomCode"
          element={<Room leaveRoomCallback={clearRoomCode} />}
        />
      </Routes>
    </Router>
  );
}

export default HomePage;
