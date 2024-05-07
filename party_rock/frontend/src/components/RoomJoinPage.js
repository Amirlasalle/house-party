import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AnimatedText from "./AnimatedText"


const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
    setError(false);
  };

  const roomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container fluid className="flex flex-col items-center justify-center bg-dark p-5 rounded-lg h-87-vh w-100">
    <div className="flex flex-col justify-center items-center text-center my-5 h-87-vh w-100">
    <div className=" h-50-vh flex items-center justify-center text-center">
          <AnimatedText
            text="Join A Room"
            className="text-center text-6xl"
          />
        </div>
        <div className="text-center">
          <Form.Control
            type="text"
            placeholder="Enter a Room Code"
            value={roomCode}
            onChange={handleTextFieldChange}
            isInvalid={error}
            style={{ color: "black" }}
          />
          <Form.Control.Feedback type="invalid">
            Room not found
          </Form.Control.Feedback>
        </div>
        <div className="text-center">
          <Button
            variant="success"
            className="mx-1 mt-3 bg-spotify-green rounded-lg text-white hover-bright-lg btn-sm"
            onClick={roomButtonPressed}
          >
            Join <FontAwesomeIcon icon={faRightToBracket} fade />
          </Button>
        </div>
        <div className="text-center">
          <Button
            variant="danger"
            className="mx-1 my-2 rounded-lg text-white hover-bright-lg btn-sm"
            to="/"
            as={Link}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default RoomJoinPage;
