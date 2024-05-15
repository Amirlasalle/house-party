import React, { useState } from "react";
import Oig2 from "../images/OIG2.png"
import { Card, ProgressBar, Image } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const CurrentlyPlaying = (props) => {
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
        <div className="p-1 justify-center items-center flex flex-col w-18rem overflow-x-hidden">
            <div className='flex flex-col items-start justify-start w-18rem'>
                <div className="flex items-start justify-start ml-2">
                    <h6 className="mt-2 text-left text-white flex items-start justify-start font-medium">Now playing</h6>
                </div>

                <div className="w-18rem">
                    <ul className='pl-0 '>
                     
                            <li className='p-1 inline-flex w-17rem hover-bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <Image
                                        src={props.image_url || Oig2}
                                        width="50"
                                        height="50"
                                        alt={props.name}
                                        className="rounded-lg"
                                    />

                                    <div className="flex flex-col justify-start items-start ml-2">
                                        <div className="flex items-start justify-start">
                                            <p className="text-left elipsis-line text-spotify-green flex items-start justify-start text-base">
                                                <span className='text-base text-left items-start justify-start elipsis'>{props.title}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-start justify-start">
                                            <p className="text-left elipsis-line text-default flex items-start justify-start">
                                                <span className='text-medium text-default text-left items-start justify-start elipsis'>{props.artist}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                    
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CurrentlyPlaying;
