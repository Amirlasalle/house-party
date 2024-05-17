import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, OverlayTrigger } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";
import NowPlaying from "./NowPlaying";
import Queue from "./Queue";
import { QueueIcon, PlayingIcon, LyricsIcon } from "./Icons.js";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Credits from "./Credits";
import CurrentArtist from "./CurrentArtist";
import SearchSong from "./SearchSong";

const Room = ({ leaveRoomCallback }) => {
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    spotifyAuthenticated: false,
    song: {},
    artists: {},
  });
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('playing');
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

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
        className="mx-2 rounded-full btn-circle-green"
        onClick={() => updateShowSettings(true)}
      >
        <FontAwesomeIcon icon={faGear} className="text-white" />
      </Button>
    );
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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000);
    return () => clearInterval(interval);
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
      })
      .catch((error) => {
        console.error("Error fetching current song:", error);
      });
  };
  

  const playing = (props) => (
    <div {...props} className='p-1 mr-2 flex justify-center items-center rounded bg-dark-light'>
      <div><p className='text-white m-0'>Now Playing</p></div>
    </div>
  );

  const lyrics = (props) => (
    <div {...props} className='p-1 mt-2 flex justify-center items-center rounded bg-dark-light'>
      <div><p className='text-white m-0'>Lyrics</p></div>
    </div>
  );

  const queue = (props) => (
    <div {...props} className='p-1 ml-2 flex justify-center items-center rounded bg-dark-light'>
      <div><p className='text-white m-0'>Queue</p></div>
    </div>
  );

  if (showSettings) {
    return renderSettings();
  }

  return (
    <div className="w-100 h-100-vh bg-black inline-flex">


      <div className="flex flex-col items-center justify-center bg-black rounded-lg h-100-vh w-100"
        style={{ minWidth: '30rem' }}>
        <Container fluid className="flex flex-col items-center justify-center bg-dark rounded-lg my-2 h-100-vh w-100">
          <div className="flex flex-col items-center justify-center w-100">

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

      <div className="flex flex-col items-center ml-2 mr-0 justify-center bg-black rounded-lg h-100-vh w-18rem"
        style={{ minWidth: '18rem' }}>
        <div className="flex flex-col items-start justify-start bg-dark rounded-lg my-2 h-100-vh w-100">
          <div className="flex flex-col items-center justify-center w-100">


            <div className="flex h-32rem justify-center items-center flex-row shadow-top w-100">

              <div className="h-4rem w-18rem shadow-30 z-2 flex justify-center items-center">

                <OverlayTrigger
                  placement="left"
                  delay={{ show: 250, hide: 50 }}
                  overlay={playing}
                >
                  <div
                    className={`cursor-pointer justify-center mb-3 room-tabbs rounded-xl items-center mr-2 ${activeTab === 'playing' ? 'active-tabbs' : ''}`}
                    onClick={() => handleTabClick('playing')}
                  >
                    <PlayingIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
                  </div>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 50 }}
                  overlay={lyrics}
                >
                  <div
                    className={`justify-center cursor-pointer room-tabbs mb-3 rounded-xl items-center mx-2 ${activeTab === 'lyrics' ? 'active-tabbs' : ''}`}
                    onClick={() => handleTabClick('lyrics')}
                  >
                    <LyricsIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
                  </div>
                </OverlayTrigger>

                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 50 }}
                  overlay={queue}
                >
                  <div
                    className={`justify-center cursor-pointer mb-3 room-tabbs rounded-xl items-center ml-2 ${activeTab === 'queue' ? 'active-tabbs' : ''}`}
                    onClick={() => handleTabClick('queue')}
                  >
                    <QueueIcon className="cursor-pointer justify-center room-tabbs rounded-xl items-center mr-2" />
                  </div>
                </OverlayTrigger>

              </div>

              <div className="bg-dark rounded-lg h-32rem mb-1 w-100 z-1 overflow-y-hidden overflow-x-hidden flex justify-center items-center">

                {activeTab === 'playing' && (
                  <div className="inline-flex px-1 my-1 pt-2 h-32rem justify-center items-center flex-row overflow-y-scroll w-100">
                    <NowPlaying {...song} />
                    <CurrentArtist {...song} />
                    <Credits {...song} />
                  </div>
                )}

                {activeTab === 'lyrics' && (
                  <div className="inline-flex px-1 my-1 h-32rem justify-center items-center flex-row overflow-y-scroll w-100">
                
                
                    <MusicPlayer {...song} />

                  </div>
                )}

                {activeTab === 'queue' && (
                  <div className="inline-flex px-1 my-1 h-32rem justify-center items-center flex-row overflow-y-scroll w-100">
                    <CurrentlyPlaying {...song} />
                    <Queue {...song} />
                  </div>
                )}

              </div>
            </div>


          </div>
        </div>
      </div>

    </div >

  );
};

export default Room;
