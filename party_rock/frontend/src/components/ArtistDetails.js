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
        <div className="p-1 justify-center items-center flex flex-col">
            <div className="w-100 pl-0 flex flex-col items-start justify-center">
                <div className="mt-2 rounded-lg flex justify-center">
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
                        <h4 className="pl-0 text-white font-semibold text-xlg">{`${props.title ? props.title : "Nothing is being played"}`}</h4>
                    </div>
                    <div className="max-w-100 flex items-start justify-start">

                        <h6 className={`w-auto flex font-light items-center justify-center pl-0 hover-text-white hover-underline ${props.artist ? 'text-default' : 'text-black'}`}>{`${props.artist ? props.artist : "Spotify premium is needed to access playback controlls 😊 "}`}</h6>
                    </div>
                </div>


            </div>


            <div className="flex items-start justify-start mt-4 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">

                <div className="pl-3 flex flex-col items-start justify-start text-left">
                    <h6 className="mt-2 text-white font-medium">{`${props.artist ? "About the artist" : " "}`}</h6>

                    <div className="mt-2 rounded-full flex items-start justify-start">
                        <Image
                            src={`${props.image_url ? props.image_url : Oig2}`}
                            width="40%"
                            height="40%"
                            alt={Image}
                            className="rounded-full"
                        />
                    </div>

                    <div className="max-w-100 flex items-center justify-center">

                        <h6 className="mt-2 text-white font-medium">{`${props.artist ? props.artist : " "}`}</h6>
                    </div>



                </div>

            </div>
        </div>
    );
};

export default ArtistDetails;
