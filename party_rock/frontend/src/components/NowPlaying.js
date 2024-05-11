import React, { useState } from "react";
import Oig2 from "../images/OIG2.png"
import { Card, ProgressBar, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const NowPlaying = (props) => {
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
       <div className="p-1">
            <div className="w-100 pl-0 flex flex-col items-start justify-center">
                <div className="mt-2 rounded-lg d-flex justify-center">
                    <Image
                        src={`${props.image_url ? props.image_url : Oig2}`}
                        width="100%"
                        height="100%"
                        alt={Image}
                        className="rounded-lg"
                    />
                </div>

                <div className="pl-0 mt-2 text-left">
                <div className="max-w-100 flex items-start justify-start text-left">
                    <h1 className="pl-0 text-white font-semibold">{`${props.title ? props.title : "Nothing is being played"}`}</h1>
                    </div>
                    <div className="max-w-100 flex items-start justify-start">

                        <h5 className={`w-auto flex items-center justify-center pl-0 px-6  hover-text-white ${props.artist ? 'text-default' : 'text-black'}`}>{`${props.artist ? props.artist : "Spotify premium is needed to access playback controlls 😊 "}`}</h5>
                    </div>
                </div>


            </div>


            <Card className="my-1 bg-spotify-green overflow-hidden rounded-lg"
                style={{ width: '18rem' }}
            >


                <div className="pl-0 text-center">
                    <h6 className="mt-2 pl-0 text-white font-semibold">{`${props.title ? props.title : "Nothing is being played"}`}</h6>
                    <div className="max-w-100 flex items-center justify-center">

                        <p className={`w-auto flex items-center justify-center small pl-0 px-6  hover-text-white ${props.artist ? 'text-default' : 'text-black'}`}>{`${props.artist ? props.artist : "Spotify premium is needed to access playback controlls 😊 "}`}</p>
                    </div>



                </div>

            </Card>
       </div>
    );
};

export default NowPlaying;
