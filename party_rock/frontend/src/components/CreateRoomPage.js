import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, FormLabel, FormControl, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AnimatedText from "./AnimatedText";


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
      <div className="d-flex flex-column items-center justify-center bg-dark rounded-lg pr-4">
        <Button
          className="bg-spotify-green hover-bg-spotify mx-1 rounded-lg text-white"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
        <Button
          className="bg-danger mx-1 rounded-lg no-decoration hover-bg-red-400 text-white"
          variant="contained"
          to="/"
          as={Link}
        >
         <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Button>
      </div>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <div className="d-flex flex-col items-center justify-center bg-dark mr-4">
        <Button
          className="bg-spotify-green hover-bg-spotify mx-1 rounded-lg text-white"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room <FontAwesomeIcon icon={faCircleUp} />
        </Button>
      </div>
    );
  };

  const title = update ? "Update Room" : "Create a Room";

  return (
    <Container fluid className="flex flex-col items-center justify-center bg-dark p-5 rounded-lg h-87-vh w-100">
        <div className="flex flex-col justify-center items-center my-5 h-87-vh w-100">
          {errorMsg && (
            <Alert variant="danger" onClose={() => setErrorMsg("")} dismissible>
              {errorMsg}
            </Alert>
          )}
          {successMsg && (
            <Alert variant="success" onClose={() => setSuccessMsg("")} dismissible>
              {successMsg}
            </Alert>
          )}
        <div>
          <h4 className="text-white">{title}</h4>
        </div>
        <div>
          <Form>
            <FormGroup>
              <FormLabel className="text-white">Guest Control of Playback State</FormLabel>
              <div className="d-flex mb-2">
                <FormControl
                  as="select"
                  className="bg-dark text-white"
                  value={guestCanPause.toString()}
                  onChange={handleGuestCanPauseChange}
                >
                  <option value="true">Play/Pause</option>
                  <option value="false">No Control</option>
                </FormControl>
              </div>
            </FormGroup>
            <FormGroup className="mb-2">
              <FormLabel className="text-white">Votes Required To Skip Song</FormLabel>
              <FormControl
                type="number"
                className="bg-dark text-white"
                value={votesToSkip}
                onChange={handleVotesChange}
                min="1"
              />
            </FormGroup>
          </Form>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center bg-dark rounded-lg ml-4">
          {update ? renderUpdateButtons() : renderCreateButtons()}
        </div>
      </div>
    </Container>
  );
};

export default CreateRoomPage;
