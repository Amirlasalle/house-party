import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Button, Container, Image } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Info from "./Info";
import AnimatedText from "./AnimatedText"
import homePic from "../images/party-rock-home.png"


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
      <div className="w-100 inline-flex">
      <Container fluid className="flex flex-col items-center justify-center bg-dark p-5 rounded-lg h-87-vh w-100"
       style={{ minWidth: '40rem' }}>
        <div className="flex justify-center items-center my-5 h-87-vh w-100">
          <Button as={Link} to="/info" className="flex justify-center items-center text-white btn-circle bg-black">
            <FontAwesomeIcon icon={faCircleInfo} className="justify-center items-center text-spotify-green" />
          </Button>
        </div>
        <div className=" h-80-vh flex items-center justify-center text-center">
          <AnimatedText
            text="Welcome To Party Rock"
            className="text-center "
          />
        </div>
        <div className="flex items-center justify-center text-center">
          <Image
            src={homePic}
            alt="Party Rock"
            width={200}
            height={200}
            priority="true"
          />
        </div>
        <div className="w-full flex items-center justify-center text-center hover-underline-none">
          <Button as={Link} to="/join" variant="white" className="text-dark hover-underline-none mx-1 rounded-lg">
            Join a Room
          </Button>
          <Button as={Link} to="/create" variant="flat" className="text-white bg-spotify-green mx-1 my-2 rounded-lg hover-underline-none hover-bg-spotify">
            Create a Room
          </Button>
        </div>
      </Container>



       <Container fluid className="flex ml-2 flex-col items-center justify-center bg-dark p-5 rounded-lg h-87-vh w-50 overflow-y-scroll overflow-x-hidden"
        style={{ minWidth: '20rem' }}>
       <div className="flex justify-center items-center my-5 h-87-vh w-100">
         <Button as={Link} to="/info" className="flex justify-center items-center text-white btn-circle bg-black">
           <FontAwesomeIcon icon={faCircleInfo} className="justify-center items-center text-spotify-green" />
         </Button>
       </div>
       <div className=" h-80-vh flex items-center justify-center text-center">
         <AnimatedText
           text="Welcome To Party Rock"
           className="text-center "
         />
       </div>
       <div className="flex items-center justify-center text-center">
         <Image
           src={homePic}
           alt="Party Rock"
           width={200}
           height={200}
           priority="true"
         />
       </div>
       <div className="w-full flex items-center justify-center text-center hover-underline-none">
         <Button as={Link} to="/join" variant="white" className="text-dark hover-underline-none mx-1 rounded-lg">
           Join a Room
         </Button>
         <Button as={Link} to="/create" variant="flat" className="text-white bg-spotify-green mx-1 my-2 rounded-lg hover-underline-none hover-bg-spotify">
           Create a Room
         </Button>
       </div>
     </Container>
     </div>
    );
  };
  
  const clearRoomCode = () => {
    setRoomCode("");
  };

  return (
    <Router>
      <div id="root" className="w-100 d-flex justify-content-center align-items-center ">
      {/* <NavigationBar className="h-87-vh"/> */}
        <Routes>
          <Route
            exact
            path="/"
            element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()}
          />
          <Route path="/info" element={<Info />} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room leaveRoomCallback={clearRoomCode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default HomePage;