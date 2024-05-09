import React, { useState } from "react";
import Oig2 from "../images/OIG2.png"
import { Card, ProgressBar, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const ArtistDetails = (props) => {
  const songProgress = (props.time / props.duration) * 100;

  const [isClicked, setIsClicked] = useState(false);

  const pauseSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  };

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  };

  const prevSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/prev", requestOptions);
  };

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);
  };

  const handleClickShrink = () => {
    if (isClicked) {
      return { transform: "scale(0.9)" };
    } else {
      return { transform: "scale(1)" };
    }
  };

  return (
    <>
      <div className="w-100 pl-0 d-flex justify-content-center">
        <p className="text-default pl-0 my-0 font-light smaller">
          Votes to skip: {props.votes} / {props.votes_required}
        </p>
      </div>
      <Card className="my-1 bg-spotify-green overflow-hidden rounded-lg"
       style={{ width: '18rem' }}
      >
        <div className="my-2 bg-spotify-green  rounded-lg d-flex justify-content-center">
          <Image
            src={`${props.image_url ? props.image_url : Oig2}`}
            width="85%"
            height="85%"
            alt={Image}
            className="rounded-lg"
          />
        </div>

        <div className="pl-0 text-center">
          <h6 className="mt-2 pl-0 text-white font-semibold">{`${props.title ? props.title : "Nothing is being played"}`}</h6>
          <div className="max-w-100 flex items-center justify-center">

          <p className={`w-auto flex items-center justify-center small pl-0 px-6  hover-text-white ${props.artist ? 'text-default' : 'text-black' }`}>{`${props.artist ? props.artist : "Spotify premium is needed to access playback controlls 😊 " }`}</p>
          </div>

          <div className="inline-flex flex-row justify-center items-center my-2">
           
            <FontAwesomeIcon onClick={() => prevSong()}   icon={faBackwardStep} className="text-xl justify-center items-center text-default hover-text-white  cursor-pointer" />
       <div className="flex items-center justify-center text-center">
            <div
              className={`mx-5 mt-0 flex justify-center items-center text-white btn-circle bg-white cursor-pointer ${isClicked ? "hover-shrink" : "hover-grow"}`}
              onClick={() => {
                props.is_playing ? (pauseSong(), handleClick()) : (playSong(), handleClick());
              }}
              style={{
                ...handleClickShrink(),
                transition: "transform 0.3s ease",
              }}
            >
              {props.is_playing ? (
               <FontAwesomeIcon icon={faPause}  className="text-black text-center items-center justify-center" />
              ) : (
                <FontAwesomeIcon icon={faPlay} className="text-black text-center items-center justify-center" />
              )}
            </div>
            </div>
          
            <FontAwesomeIcon onClick={() => skipSong()}  icon={faForwardStep} className="text-xl justify-center items-center text-default hover-text-white  cursor-pointer" fontSize="large" />
          
            
          </div> 
     
       
        </div>
       
       <ProgressBar variant="light"  style={{ height: '2.5px' }} now={songProgress} />
      </Card>
    </>
  );
};

export default ArtistDetails;
