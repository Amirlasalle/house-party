import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

const Room = ({ leaveRoomCallback }) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    spotifyAuthenticated: false,
    song: {},
  });
  const [showSettings, setShowSettings] = useState(false);
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

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
        if (data.is_host) {
          authenticateSpotify();
        }
      });
  };

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          spotifyAuthenticated: data.status,
        }));
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSong(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching current song:", error);
      });
  };

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
  }, []);

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
      <Container fluid className="mt-5 flex justify-center items-center bg-dark p-5 rounded-lg h-80-vh w-100 overflow-y-scroll overflow-x-hidden">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} className="my-2">
            <CreateRoomPage
              update={true}
              votesToSkip={roomDetails.votesToSkip}
              guestCanPause={roomDetails.guestCanPause}
              roomCode={roomCode}
              updateCallback={getRoomDetails}
            />
          </Col>
          <Col xs={12} className="text-center">
            <Button
              variant="contained"
              className="bg-danger rounded-lg text-white hover-bright-lg"
              onClick={() => updateShowSettings(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </Col>
        </Row>
      </Container>
    );
  };

  const renderSettingsButton = () => {
    return (
  
          <Button
            className="bg-spotify-green mx-2 btn-circle hover-bright-lg"
            onClick={() => updateShowSettings(true)}
          >
            <FontAwesomeIcon icon={faGear} className="text-white" />
          </Button>
      
    );
  };

  if (showSettings) {
    return renderSettings();
  }

  return (
    <div className="w-100 inline-flex">
    <Container fluid className="flex justify-center items-center bg-dark p-5 my-5 mr-2 rounded-lg h-80-vh w-100  overflow-y-scroll overflow-x-hidden"
    >
      <Row className="justify-content-center items-center my-2">
        <div xs={12} className="mt-5 text-center">
          <h5 className="font-semibold pl-0 text-white">Room Code: {roomCode}</h5>
        </div>
        <div className="flex flex-col justify-center items-center">
          <MusicPlayer {...song} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Col xs={12} className="mb-1 flex flex-row items-center justify-center">
            {roomDetails.isHost ? renderSettingsButton() : null}
            <Button
              variant="contained"
              className="bg-danger rounded-lg text-white hover-bright-lg mx-2"
              onClick={leaveButtonPressed}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
          </Col>
        </div>
      </Row>
    </Container>
    <Container fluid className="flex justify-center items-center bg-dark p-5 my-5 rounded-lg h-80-vh w-50 overflow-y-scroll overflow-x-hidden"
       style={{ minWidth: '18rem' }}
    >
      <Row className="justify-content-center items-center my-2">
        <div xs={12} className="mt-5 text-center">
          <h5 className="font-semibold pl-0 text-white">Room Code: {roomCode}</h5>
        </div>
        <div className="flex flex-col justify-center items-center">
          <MusicPlayer {...song} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Col xs={12} className="mb-1 flex flex-row items-center justify-center">
            {roomDetails.isHost ? renderSettingsButton() : null}
            <Button
              variant="contained"
              className="bg-danger rounded-lg text-white hover-bright-lg mx-2"
              onClick={leaveButtonPressed}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
          </Col>
        </div>
      </Row>
    </Container>
    </div>
  );
};

export default Room;
