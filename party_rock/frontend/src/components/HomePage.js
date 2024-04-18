import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

function HomePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <div >
      <h1>This is the Home page</h1>
    </div>} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default HomePage;
