import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Tab, Tabs, OverlayTrigger, OverlayProps } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import ArtistDetails from "./ArtistDetails"
import { QueueIcon, PlayingIcon, PlayingIconTwo, LyricsIcon } from "./Icons.js"





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
      <Container fluid className="flex justify-center items-center bg-dark rounded-lg h-full w-100 overflow-hidden">
        <div className="justify-content-center align-items-center">
          <div className="flex flex-col items-center justify-center">
            <div
              className="update-button items-center justify-center rounded-full cursor-pointer text-white"
              onClick={() => updateShowSettings(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
            <CreateRoomPage
              update={true}
              votesToSkip={roomDetails.votesToSkip}
              guestCanPause={roomDetails.guestCanPause}
              roomCode={roomCode}
              updateCallback={getRoomDetails}
              className="flex flex-col justify-center items-center bg-dark w-100"
            />

          </div>
        </div>
      </Container>
    );
  };



  const renderSettingsButton = () => {
    return (

      <Button
        className=" mx-2 rounded-full btn-circle-green"
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
    <div className="w-100 h-100-vh bg-black inline-flex mr-0 p-2 items-center justify-center">


      <div className="flex flex-col items-center justify-center bg-black rounded-lg h-100-vh w-100"
        style={{ minWidth: '30rem' }}>
        <Container fluid className="flex flex-col items-center justify-center bg-dark rounded-lg my-2 h-100-vh w-100">
          <div fluid className="flex flex-col items-center justify-center w-100">

            <div className="flex text-center justify-center items-center ">
              <h5 className="text-center justify-center items-center  font-semibold pl-0 text-white">Room Code: {roomCode}</h5>
            </div>
            <div className="flex flex-col justify-center items-center">
              <MusicPlayer {...song} />
            </div>
            <div className="w-100 flex flex-col items-center justify-center">
              <div className="mb-1 flex flex-row items-center justify-center">
                {roomDetails.isHost ? renderSettingsButton() : null}
                <Button
                  variant="contained"
                  className="bg-danger rounded-lg text-white hover-bright-lg mx-2 btn-circle"
                  onClick={leaveButtonPressed}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
              </div>
            </div>

          </div>
        </Container>
      </div>

      <div className="flex flex-col items-center ml-2 mr-0 justify-center bg-black rounded-lg h-100-vh w-50"
        style={{ minWidth: '20rem' }}>
        <Container fluid className="flex flex-col items-center justify-center bg-dark rounded-lg my-2 h-100-vh w-100">
          {/* <div className="inline-flex mb-3 text-center justify-center items-center shadow-xl">
              <div className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2">
                <PlayingIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
              </div>
              <div className="justify-center cursor-pointer room-tabbs rounded-xl items-center mx-2">
                <LyricsIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
              </div>
              <div className="justify-center cursor-pointer room-tabbs rounded-xl items-center ml-2">
                <QueueIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
              </div>
            </div> */}
          <div fluid className="flex flex-col items-center justify-center w-100">

            <div className="inline-flex mb-3 text-center justify-center items-center shadow-xl">
              <div className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2">
                <PlayingIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
              </div>
              <div className="justify-center cursor-pointer room-tabbs rounded-xl items-center mx-2">
                <LyricsIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
              </div>
              <div className="justify-center cursor-pointer room-tabbs rounded-xl items-center ml-2">
                <QueueIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
              </div>
            </div>

            <div className="bg-white rounded-lg h-35rem w-100 overflow-y-hidden overflow-x-hidden flex justify-center items-center">

              <div className="inline-flex h-34rem justify-center items-center flex-row overflow-y-scroll shadow-top  w-100">
                <MusicPlayer {...song} />
                <MusicPlayer {...song} />
                <MusicPlayer {...song} />
                <MusicPlayer {...song} />
                <MusicPlayer {...song} />
              </div>
            </div>
          </div>
        </Container>
      </div>

    </div>

  );
};

export default Room;
