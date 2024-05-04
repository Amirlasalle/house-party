import { useState } from 'react';
import { Button, Container, Form, Nav, Offcanvas, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function NavigationBar({ leaveRoomCallback }) {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    // const navigate = useNavigate();
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

    return (
    

            <div className="bg-light p-1 rounded-lg">
                <Nav className="w-100 flex-column bg-dark rounded-lg">

                    <div className="flex items-center justify-center text-2xl rounded-lg text-white hover-bright-lg"
                    >
                        <div className="inline-flex flex-row justify-center items-center my-2">
                            <FontAwesomeIcon icon={faHouse} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                        </div>

                        {/* <span className='ml-5 items-end justify-center text-lg'>Home</span> */}
                        {/* onClick={leaveButtonPressed}> */}
                        
                
            </div>
            <div className="inline-flex flex-row justify-center items-center my-2">
                            <FontAwesomeIcon icon={faHouse} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                        </div>
            <Nav.Link href="#">Link 2</Nav.Link>
            <Nav.Link href="#">Link 3</Nav.Link>
        </Nav>
                {/* <Form className="mt-3">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="mb-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-primary" className="w-100">Search</Button>
                </Form> */}



    <Container fluid className="p-3 mt-2 w-100 flex-column bg-dark rounded-lg">

        <div className="inline-flex flex-row justify-center items-center my-2 ">
            <FontAwesomeIcon icon={faUsers} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
        </div>

        <Offcanvas
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
            placement="start"
            aria-labelledby="offcanvasNavbarLabel"
            className="h-100"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

            </Offcanvas.Body>
        </Offcanvas>

    </Container>
            </div >
        
    );
}

export default NavigationBar;