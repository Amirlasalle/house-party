import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

function HomePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <div >
      <h1>This is the Home page</h1>
    </div>} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
      </Routes>
    </Router>
  );
}

export default HomePage;
