import React, { useState, useEffect } from 'react';
import { Image, OverlayTrigger } from "react-bootstrap";
import Oig2 from "../images/OIG2.png";
import { UserIcon } from './Icons';

const FollowedArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            getFollowedArtists();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const artistDetails = (artist) => (
        <div className='p-1 ml-2 rounded bg-dark-light'>
            <div><p className='text-white text-md'>{artist.name}</p></div>
        </div>
    );

    const getFollowedArtists = () => {
        fetch("/spotify/followed-artists")
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        throw new Error(`${response.status}: ${errorData.error}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setArtists(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className='h-60-vh p-1 justify-center overflow-y-scroll'>
                <div className='justify-center items-center flex flex-col'>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='h-60-vh p-1 justify-center overflow-y-scroll'>
                <div className='justify-center items-center flex flex-col'>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                    <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                        <div className="border-spotify-green flex bg-clear justify-center items-center cursor-pointer where-to-image-two" >
                            <UserIcon />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!artists || artists.length === 0) {
        return <p className='text-white'>No followed artists.</p>;
    }

    return (
        <div className='h-60-vh p-1 justify-center overflow-y-scroll'>
            <div className='justify-center items-center flex flex-col'>
                {artists.map((artist) => (
                    <OverlayTrigger
                        key={artist.id}
                        placement="right"
                        delay={{ show: 250, hide: 50 }}
                        overlay={artistDetails(artist)}
                    >
                        <div className="flex items-center justify-center where-to-cards-two rounded-lg hover-bg-clear cursor-pointer">
                            <Image
                                src={artist.images[0]?.url || Oig2}
                                className="img-fluid d-flex border-spotify-green flex-wrap justify-content-around cursor-pointer where-to-image-two"
                            />
                        </div>
                    </OverlayTrigger>
                ))}
            </div>
        </div>
    );
};

export default FollowedArtists;