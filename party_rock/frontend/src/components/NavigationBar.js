// import { useState } from 'react';
// import { Button, Container, Form, Nav, Offcanvas, Image, Overlay } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
// import friendslistData from './jsons/friendsdemo.json';


// function NavigationBar({ leaveRoomCallback }) {
//     const [friendslist] = useState(friendslistData)

//     const [show, setShow] = useState(false);
//     const target = useRef(null);

//     const [showOffcanvas, setShowOffcanvas] = useState(false);
//     const handleCloseOffcanvas = () => setShowOffcanvas(false);
//     const handleShowOffcanvas = () => setShowOffcanvas(true);


//     const leaveButtonPressed = () => {
//         const requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//         };
//         fetch("/api/leave-room", requestOptions).then((_response) => {
//             leaveRoomCallback();
//             navigate("/");
//         });
//     };

//     return (


//         <div className="bg-black mx-2 rounded-lg">
//             <Nav className="w-100 flex-column bg-dark rounded-lg px-4">

//                 <div className="flex items-center justify-center text-2xl rounded-lg text-white hover-bright-lg"
//                 >
//                     <div className="inline-flex flex-row justify-center items-center my-2">
//                         <a href='/' >
//                             <FontAwesomeIcon icon={faHouse} onClick={leaveButtonPressed} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
//                         </a>
//                     </div>




//                 </div>

//                 <div className="inline-flex flex-row justify-center items-center my-2 pb-2">
//                     <FontAwesomeIcon icon={faHouse} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
//                 </div>
//             </Nav>




//             <Container fluid className="p-0 w-100 h-100 flex-column bg-link rounded-lg">
//                 <div className='bg-dark mt-1 rounded-lg'>
//                     <div className="inline-flex flex-row justify-center items-center my-2 ">
//                         <FontAwesomeIcon icon={faUsers} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
//                     </div>

//                     <div className='h-full bg-danger justify-center overflow-y-scroll'>
//                         <div className='h-90 justify-center flex flex-col bg-danger'>
//                            { friendslist.map((friend, key) => 
//                            <div key={key} 
//                            className=" mx-1 where-to-cards-two" 
//                            style={{ width: '3.5rem' }}
//                            ref={target} 
//                            onClick={() => setShow(!show)}>
//                              <Image src={friend.propic} className="img-fluid d-flex flex-wrap justify-content-around where-to-image-two" />
//                            </div>


//                            )}
//                         </div>
//                     </div>
//                 </div>
//                 <Offcanvas
//                     show={showOffcanvas}
//                     onHide={handleCloseOffcanvas}
//                     placement="start"
//                     aria-labelledby="friendsList"
//                     className="flex h-100 bg-spotify-green"
//                 >
//                     <Offcanvas.Header closeButton>
//                         <Offcanvas.Title id="offcanvasNavbarLabel" className='text-white'><span className='flex items-center justify-center'>Friends List</span></Offcanvas.Title>
//                     </Offcanvas.Header>
//                     <Offcanvas.Body>

//                     </Offcanvas.Body>
//                 </Offcanvas>

//             </Container>
//         </div >

//     );
// }

// export default NavigationBar;
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
            <div className="bg-black mx-2 rounded-lg">
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
                <Container fluid className="p-0 w-100 h-100 flex-column bg-link rounded-lg">
                    <div className='bg-dark mt-1 rounded-lg'>
                        <div className="inline-flex flex-row justify-center items-center my-2 ">
                            <FontAwesomeIcon icon={faUsers} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                        </div>
                        <div className='h-full  p-2 bg-white justify-center overflow-y-scroll'>
                            <div className='h-90 justify-center items-center inline-flex flex-col  bg-danger overflow-y-scroll'>
                                {friendslist.map((friend, key) => (
                                    <div key={key}
                                        className="my-1 where-to-image-two rounded-full overflow-y-scroll"
                                        ref={target}
                                        onClick={() => setShow(!show)}>
                                        <Image src={friend.propic} className="img-fluid d-flex flex-wrap justify-content-around where-to-image-two" />
                                        <Overlay target={target.current} show={show} placement="right">
                                            {({
                                                placement: _placement,
                                                arrowProps: _arrowProps,
                                                show: _show,
                                                popper: _popper,
                                                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                                                ...props
                                            }) => (
                                                <div
                                                    {...props}
                                                    style={{
                                                        position: 'absolute',
                                                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                                        padding: '2px 10px',
                                                        color: 'white',
                                                        borderRadius: 3,
                                                        ...props.style,
                                                    }}
                                                >
                                                    Simple tooltip
                                                </div>
                                            )}
                                        </Overlay>
                                    </div>
                                ))}
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
                </Container>
            </div>
        </>
    );
}

export default NavigationBar;
