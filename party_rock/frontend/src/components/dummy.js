import React from 'react'

const dummy = () => {
  return (
    <>
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