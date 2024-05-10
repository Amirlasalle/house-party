import React from 'react'

const dummy = () => {
    return (
        <>
            <div className="h-100-vh bg-black inline-flex">

                <Container fluid className="flex flex-col items-center justify-center bg-white rounded-lg h-100-vh">

                    <Nav className="h-100-vh inline-flex flex-row rounded-lg justify-center items-center nav">
                        <div className="inline-flex flex-col items-center justify-center text-2xl bg-dark rounded-lg text-white hover-bright-lg">
                            <div className="flex items-center justify-center text-2xl  rounded-lg text-white hover-bright-lg">
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 50 }}
                                    overlay={home}
                                >
                                    <div className="inline-flex flex-row justify-center items-center">
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

                        <div className="p-0 h-full w-100 flex-column rounded-lg">
                            <div className='bg-dark rounded-lg'>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 50 }}
                                    overlay={expandFriendList}
                                >
                                    <div className="flex flex-row justify-center items-center my-4 ">
                                        <FontAwesomeIcon icon={faUsers} onClick={handleShowOffcanvas} className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                                    </div>
                                </OverlayTrigger>
                                <div className='h-50-vh p-1 justify-center overflow-y-scroll'>
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
                    </Nav>

                </Container>


            </div>
        </>
    )
}

export default dummy