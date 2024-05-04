import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


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
    <Container fluid className="mt-5 flex justify-center items-center text-black">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} className="text-center">
          <h4 className="font-bold text-white">Join A Room</h4>
        </Col>
        <Col xs={12} className="text-center">
          <Form.Control
            type="text"
            placeholder="Enter a Room Code"
            value={roomCode}
            onChange={handleTextFieldChange}
            isInvalid={error}
            style={{ color: "black" }}
          />
          {/* <Form.Control.Feedback type="invalid">
            Room not found
          </Form.Control.Feedback> */}
        </Col>
        <Col xs={12} className="text-center">
          <Button
            variant="success"
            className="mx-1 rounded-lg text-white hover-bright-lg"
            onClick={roomButtonPressed}
          >
            Join <FontAwesomeIcon icon={faRightToBracket} fade />
          </Button>
        </Col>
        <Col xs={12} className="text-center">
          <Button
            variant="danger"
            className="mx-1 my-2 rounded-lg text-white hover-bright-lg"
            to="/"
            as={Link}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default RoomJoinPage;
