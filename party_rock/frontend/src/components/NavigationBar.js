import { useState, useRef } from 'react';
import { Button, Container, Form, Nav, Offcanvas, Image, OverlayTrigger, OverlayProps } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHouse, faSearch, faUsers } from '@fortawesome/free-solid-svg-icons';
import friendslistData from './jsons/friendsdemo.json';
import AnimatedText from "./AnimatedText"
import homePic from "../images/party-rock-home.png"

function NavigationBar({ leaveRoomCallback }) {

    const [friendslist] = useState(friendslistData);


    const friendDetails = (friend) => (
        <div className='p-1 ml-2 rounded bg-dark-light'>
            <div><p className='text-white text-md mb-1'>{friend.name}</p></div>
            <div><p className='text-default text-xs'>{friend.username}</p></div>
            <div>
                <p className={`text-xs ${friend.status === 'online' ? 'text-spotify-green' : friend.status === 'offline' ? 'text-red-500' : friend.status === 'away' ? 'text-yellow-500' : ''}`}>
                    {friend.status}
                </p>
            </div>
        </div>
    );

    const expandFriendList = (props) => (
        <div {...props} className='p-1 ml-2 flex justify-center items-center rounded bg-dark-light'>
            <div><p className='text-white m-0'>Expand Your Friends List</p></div>
        </div>
    );

    const search = (props) => (
        <div {...props} className='p-1 ml-2 flex justify-center items-center rounded bg-dark-light'>
            <div><p className='text-white m-0'>Search</p></div>
        </div>
    );

    const home = (props) => (
        <div {...props} className='p-1 ml-2 flex justify-center items-center rounded bg-dark-light'>
            <div><p className='text-white m-0'>Home</p></div>
        </div>
    );

    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            leaveRoomCallback();
        });
    };

    return (

      
            <div className="inline-flex flex-row items-start justify-center bg-black p-2 mx-2 h-100-vh"
                style={{ width: '5rem' }}>
                <Container fluid className="flex flex-col items-center justify-center bg-dark h-20 mb-1 w-5rem mx-2 rounded-lg"
                  >
                    <div className="flex flex-col items-center justify-center">

                        <div className="inline-flex flex-col items-center justify-center text-2xl  bg-dark rounded-lg text-white">
                            <div className="flex items-center justify-center text-2xl rounded-lg text-white"
                            style={{ width: '5rem' }}>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 50 }}
                                    overlay={home}
                                >
                                    <div className="inline-flex flex-row justify-center mb-3 items-center">
                                        <a href='/' >
                                            <FontAwesomeIcon icon={faHouse} onClick={leaveButtonPressed} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                                        </a>
                                    </div>
                                </OverlayTrigger>
                            </div>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 50 }}
                                overlay={search}
                            >
                                <div className="inline-flex flex-row justify-center items-center">
                                    <FontAwesomeIcon icon={faSearch} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                                </div>
                            </OverlayTrigger>
                        </div>

                    </div>
                </Container>
     
                <Container fluid className="flex flex-col items-center justify-center bg-dark rounded-lg h-79 mb-2"
                    style={{ width: '5rem' }}>
                    <div  className="flex flex-col items-center justify-center h-100">
                        <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 50 }}
                            overlay={expandFriendList}
                        >
                            <div className="flex flex-row justify-center items-center my-4 ">
                                <FontAwesomeIcon icon={faUsers} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                            </div>
                        </OverlayTrigger>
                        
                        <div className='h-60-vh p-1 justify-center overflow-y-scroll'>
                            <div>
                                <div className=' justify-center items-center flex flex-col'>
                                    {friendslist.map((friend, id) => (
                                        <OverlayTrigger
                                            key={friend.id}
                                            placement="right"
                                            delay={{ show: 250, hide: 50 }}
                                            overlay={friendDetails(friend)}
                                        >
                                            <div
                                                className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer"
                                            >
                                                <Image
                                                    src={friend.propic}

                                                    className="img-fluid d-flex border-spotify-green flex-wrap justify-content-around cursor-pointer where-to-image-two" />
                                            </div>
                                        </OverlayTrigger>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <Offcanvas
                    show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                    placement="start"
                    aria-labelledby="friendsList"
                    className="flex h-100 bg-spotify-green"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel" className='text-white'><span className='flex items-center justify-center'>Friends List</span></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Hello Friends
                    </Offcanvas.Body>
                </Offcanvas>
            </div>

     
    );
}

export default NavigationBar;
