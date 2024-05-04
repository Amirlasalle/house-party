import { useState } from 'react';
import { Button, Container, Form, Nav, Offcanvas, Image } from 'react-bootstrap';
import homePic from "../images/party-rock-home.png"

function NavigationBar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    return (
        <div className="d-flex mr-2 rounded-lg">
            
            <div className="bg-light p-3 rounded-lg">
                <Nav className="flex-column">
                    <Nav.Link href="#"></Nav.Link>
                    <Nav.Link href="#">Link 2</Nav.Link>
                    <Nav.Link href="#">Link 3</Nav.Link>
                </Nav>
                <Form className="mt-3">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="mb-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-primary" className="w-100">Search</Button>
                </Form>
        

            {/* Main Content */}
            <Container fluid className="p-3">
                {/* Button to toggle offcanvas */}
                <Button variant="outline-success" onClick={handleShowOffcanvas}>Open Sidebar</Button>

                {/* Offcanvas */}
                <Offcanvas
                    show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                    placement="start" // Position offcanvas to the start
                    aria-labelledby="offcanvasNavbarLabel"
                    className="h-100" // Set offcanvas height to 100% of viewport
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* Links and search form can go here if you want them in the offcanvas */}
                    </Offcanvas.Body>
                </Offcanvas>

                {/* Main Content */}
                {/* Add your main content here */}
            </Container>
        </div>   
         </div>
    );
}

export default NavigationBar;
