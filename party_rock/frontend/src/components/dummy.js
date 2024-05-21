import React from 'react'

const dummy = () => {
  return (
    <>
      {/* <div className='h-60-vh p-1 justify-center overflow-y-scroll'>
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
                        </div> */}
                                            {/* <div className='h-60-vh p-1 justify-center overflow-y-scroll'>
                        <div className='justify-center items-center flex flex-col'>
                            {artists.map((artist) => (
                                <OverlayTrigger
                                    key={artist.id}
                                    placement="right"
                                    delay={{ show: 250, hide: 50 }}
                                    overlay={artistDetails(artist)}
                                >
                                    <div
                                        className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer"
                                    >
                                        <Image
                                            src={artist.images[0]?.url || Oig2}
                                            className="img-fluid d-flex border-spotify-green flex-wrap justify-content-around cursor-pointer where-to-image-two"
                                        />
                                    </div>
                                </OverlayTrigger>
                            ))}
                        </div>
                    </div> */}
    <Row className="justify-center items-center my-2">
    <div className="text-center">
      <h5 className="font-semibold pl-0 text-white">Room Code: {roomCode}</h5>
    </div>
    <div className="flex flex-col justify-center items-center">
      <MusicPlayer {...song} />
    </div>
    <div className="flex flex-col items-center justify-center">
      <Col xs={12} className="mb-1 flex flex-row items-center justify-center">
        {roomDetails.isHost ? renderSettingsButton() : null}
        <Button
          variant="contained"
          className="bg-danger rounded-lg text-white hover-bright-lg mx-2 btn-circle"
          onClick={leaveButtonPressed}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Button>
      </Col>
    </div>
  </Row>
        <div className="flex flex-col h-100 w-100 justify-center items-center">
        <Tabs
          defaultActiveKey="info"
          id="noanim-tab-example"
          variant='tabs'
          className="tabs bg-dark flex-wrap inline-flex flex-row justify-center  items-center h-11-vh p-2"
        >
          <Tab eventKey="info" title={<PlayingIcon />} className="justify-center tab">
          <div className="tab-content overflow-hidden">
            <div className="h-100-vh">
            <div className="bg-dark px-3 overflow-y-scroll w-100 tab-body tab py-5  justify-center">
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
            </div>
            </div>
            </div>
          </Tab>
          <Tab eventKey="lyrics" title={<LyricsIcon />} className="bg-dark mb-5 tab">
          </Tab>
          <Tab eventKey="queue" title={<QueueIcon />} className="bg-dark mb-5 tab">
          </Tab>
        </Tabs>
      </div>
      <Tabs
          defaultActiveKey="info"
          id="noanim-tab-example"
          variant='tabs'
          className="tabs bg-dark flex-wrap inline-flex flex-row justify-center  items-center h-11-vh p-2"
        >
          <Tab eventKey="info" title={<PlayingIcon />} className="justify-center tab">
          <div className="tab-content overflow-hidden">
            <div className="h-100-vh">
            <div className="bg-dark px-3 overflow-y-scroll w-100 tab-body tab py-5  justify-center">
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
              <ArtistDetails />
            </div>
            </div>
            </div>
          </Tab>
          <Tab eventKey="lyrics" title={<LyricsIcon />} className="bg-dark mb-5 tab">
          </Tab>
          <Tab eventKey="queue" title={<QueueIcon />} className="bg-dark mb-5 tab">
          </Tab>
        </Tabs>
      </>
  )
}

export default dummy