import React from "react";
import Oig2 from "../images/OIG2.png"
import { Image } from "react-bootstrap";


const NowPlaying = (props) => {


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
        </div>
    );
};

export default NowPlaying;
