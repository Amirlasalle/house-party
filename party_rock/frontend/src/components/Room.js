import React, { Component } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

export default function Room() {
  const { roomCode } = useParams(); // Use useParams hook to access route parameters

  const [roomDetails, setRoomDetails] = React.useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  React.useEffect(() => {
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
        console.error('Error fetching room details:', error);
      });
  };

  return (
    <div>
      <h3>{roomCode}</h3>
      <p>Votes: {roomDetails.votesToSkip}</p>
      <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p>
      <p>Host: {roomDetails.isHost.toString()}</p>
    </div>
  );
}
