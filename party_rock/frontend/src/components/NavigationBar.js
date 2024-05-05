import { useState, useRef } from 'react';
import { Button, Container, Form, Nav, Offcanvas, Image, Overlay } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import friendslistData from './jsons/friendsdemo.json';

function NavigationBar({ leaveRoomCallback }) {
    const [friendslist] = useState(friendslistData);

    const [show, setShow] = useState(false);
    const target = useRef(null);

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
        <>
            <div className=" mx-2 h-87-vh rounded-lg">
                <Nav className="w-100 flex-column bg-dark rounded-lg px-4">
                    <div className="flex items-center justify-center text-2xl rounded-lg text-white hover-bright-lg">
                        <div className="inline-flex flex-row justify-center items-center my-2">
                            <a href='/' >
                                <FontAwesomeIcon icon={faHouse} onClick={leaveButtonPressed} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                            </a>
                        </div>
                    </div>
                    <div className="inline-flex flex-row justify-center items-center my-2 pb-2">
                        <FontAwesomeIcon icon={faHouse} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                    </div>
                </Nav>
                <div className="p-0 h-full w-100 flex-column rounded-lg">
                    <div className='bg-dark h-68-vh mt-1 rounded-lg'>
                        <div className="flex flex-row justify-center items-center my-4 ">
                            <FontAwesomeIcon icon={faUsers} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                        </div>
                        <div className='h-50-vh p-1 justify-center overflow-y-scroll'>
                            <div>
                                <div className=' justify-center items-center flex flex-col'>
                                    {friendslist.map((friend, key) => (
                                        <div key={key}
                                            className="flex items-center justify-center my-1 where-to-cards-two rounded-lg hover-bg-dark-light cursor-pointer"
                                        >
                                            <Image
                                                src={friend.propic}
                                                ref={target}
                                                onClick={() => setShow(!show)}
                                                className="img-fluid d-flex flex-wrap justify-content-around cursor-pointer where-to-image-two" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
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

                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>
        </>
    );
}

export default NavigationBar;
