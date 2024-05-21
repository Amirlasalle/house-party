import { useState } from 'react';
import { Container, Offcanvas, OverlayTrigger } from 'react-bootstrap';
import SearchSong from './SearchSong';
import FollowedArtists from './FollowedArtists';
import ReauthorizeSpotify from './ReauthorizeSpotify';
import { HouseIconActive, HouseIconActiveFull, HouseIconNotActive, HouseIconNotActiveFull, LibraryActiveIcon, LibraryNotActiveIcon, SearchIconActive, SearchIconActiveFull, SearchIconNotActive, SearchIconNotActiveFull } from './Icons';
import FollowedArtistsFull from './FollowedArtistsFull';

function NavigationBar({ leaveRoomCallback }) {
    const [activeIcon, setActiveIcon] = useState('homeicon');
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showBigNavbar, setShowBigNavbar] = useState(false);
    const [showSmallNavbar, setShowSmallNavbar] = useState(true);

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName);
    };

    const handleCloseOffcanvas = () => setShowOffcanvas(false);
    const handleShowOffcanvas = () => setShowOffcanvas(true);

    const handleShowBigNavbar = () => {
        setShowBigNavbar(true);
        setShowSmallNavbar(false);
    };

    const handleShowSmallNavbar = () => {
        setShowBigNavbar(false);
        setShowSmallNavbar(true);
    };

    const leaveButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch("/api/leave-room", requestOptions).then((_response) => {
            leaveRoomCallback();
        });
    };

    const expandFriendList = (props) => (
        <div {...props} className='p-1 ml-2 flex justify-center items-center rounded bg-dark-light'>
            <div><p className='text-white m-0'>Expand Your Library</p></div>
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

    return (
        <div className="h-100-vh " style={{ maxWidth: '18rem' }}>

            {showSmallNavbar && (
                <div className="inline-flex flex-row items-start justify-center bg-black p-2 mx-2 h-100-vh" style={{ width: '5rem' }}>
                    <Container fluid className="flex flex-col items-center justify-center bg-dark h-20 w-5rem mx-2 rounded-lg">
                        <div className="flex flex-col items-center justify-center">
                            <div className="inline-flex flex-col items-center justify-center text-2xl bg-dark rounded-lg text-white">
                                <div className="flex items-center justify-center text-2xl rounded-lg text-white" style={{ width: '5rem' }}>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 50 }} overlay={home}>
                                        <div className="inline-flex flex-row justify-center mb-3 items-center">
                                            <a
                                                href='/'
                                                onClick={() => {
                                                    handleIconClick('homeicon');
                                                    leaveButtonPressed();
                                                }}
                                                className={`justify-center items-center cursor-pointer text-2xl`}
                                            >
                                                {activeIcon === 'homeicon' ? <HouseIconActive /> : <HouseIconNotActive />}
                                            </a>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 50 }} overlay={search}>
                                    <div
                                        onClick={() => {
                                            handleIconClick('searchicon');
                                            handleShowOffcanvas();
                                        }}
                                        className={`justify-center items-center cursor-pointer text-2xl a`}
                                    >
                                        {activeIcon === 'searchicon' ? <SearchIconActive /> : <SearchIconNotActive />}
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </Container>

                    <Container fluid className="flex flex-col items-center justify-center bg-dark rounded-lg h-78 mt-2" style={{ width: '5rem' }}>
                        <div className="flex flex-col items-center justify-center h-100">
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 50 }} overlay={expandFriendList}>
                                <div className="flex flex-row justify-center items-center cursor-pointer my-4 a" onClick={handleShowBigNavbar}>
                                    <LibraryNotActiveIcon className="justify-center items-center text-default hover-text-white cursor-pointer text-2xl" />
                                </div>
                            </OverlayTrigger>
                            <FollowedArtists />
                            <ReauthorizeSpotify />
                        </div>
                    </Container>
                </div>
            )}

            {showBigNavbar && (
                <div className="inline-flex flex-row items-start justify-center bg-black p-2 h-100-vh" style={{ width: '17rem' }}>

                    <Container fluid className="flex flex-col items-start justify-center bg-dark h-20 w-17rem rounded-lg">
                        <div className="flex flex-col ml-3 items-center justify-center">
                            <div className="inline-flex flex-col items-center justify-center text-2xl  rounded-lg text-white">
                                <div className="flex items-start justify-start text-2xl rounded-lg" style={{ width: '100%' }}>
                                    <OverlayTrigger placement="right" delay={{ show: 250, hide: 50 }} overlay={home}>
                                        <div className="inline-flex flex-row justify-center mb-3 items-center">
                                            <a
                                                href='/'
                                                onClick={() => {
                                                    handleIconClick('homeicon');
                                                    leaveButtonPressed();
                                                }}
                                                className={`justify-center items-center cursor-pointer text-2xl`}
                                            >
                                                {activeIcon === 'homeicon' ?
                                                    <HouseIconActiveFull /> :
                                                    <HouseIconNotActiveFull />}

                                            </a>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                                <OverlayTrigger placement="right" delay={{ show: 250, hide: 50 }} overlay={search}>
                                    <div
                                        onClick={() => {
                                            handleIconClick('searchicon');
                                            handleShowOffcanvas();
                                        }}
                                        className={`justify-center items-center cursor-pointer text-2xl a`}
                                    >
                                        {activeIcon === 'searchicon' ?
                                            <SearchIconActiveFull /> :
                                            <SearchIconNotActiveFull />}
                                    </div>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </Container>

                    <Container fluid className="p-0 flex flex-col items-center justify-center bg-dark rounded-lg h-78 mt-2" style={{ width: '18rem' }}>
                        <div className="flex flex-col items-start justify-start h-100">
                            <OverlayTrigger placement="right" delay={{ show: 250, hide: 50 }} overlay={expandFriendList}>
                                <div className="flex flex-row justify-start items-start cursor-pointer ml-3 my-4" onClick={handleShowSmallNavbar}>
                                    <LibraryActiveIcon className="justify-center items-center text-white cursor-pointer text-2xl" />
                                    <p className="ml-3 text-base font-semibold"> Your Library</p>
                                </div>
                            </OverlayTrigger>
                            <FollowedArtistsFull />
                            <ReauthorizeSpotify />
                        </div>
                    </Container>
                </div>
            )}

            <Offcanvas
                show={showOffcanvas}
                onHide={handleCloseOffcanvas}
                placement="center"
                aria-labelledby="searchBar"
                className="flex h-100 bg-spotify-green"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvasNavbarLabel" className='text-dark'><span className='flex items-center justify-center text-dark'>Party Rock Search</span></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="pt-0">
                    <SearchSong />
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default NavigationBar;

