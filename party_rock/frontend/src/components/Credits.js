import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Oig2 from '../images/OIG2.png';

const Credits = () => {
    const [artistInfo, setArtistInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentArtist();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getCurrentArtist = () => {
        fetch('/spotify/current-artist')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch current artist');
                }
                return response.json();
            })
            .then((data) => {
                setArtistInfo(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return (
            <>
                <div className="flex items-start justify-start mt-4 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">
                    <div className="pl-3 flex flex-col items-start justify-start text-left">
                        <div className="mt-2 rounded-full flex items-start justify-start" />
                        <div className="max-w-100 flex flex-col items-start justify-center mb-2">
                            <p className="mt-3 text-white text-base"></p>
                            <p className=" text-default text-medium"></p>
                            <p className=" text-default text-medium"></p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="flex items-start justify-start mt-4 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">
                    <div className="pl-3 flex flex-col items-start justify-start text-left">
                        <div className="mt-2 rounded-full flex items-start justify-start" />
                        <div className="max-w-100 flex flex-col items-start justify-center mb-2">
                            <p className="mt-3 text-white text-base"></p>
                            <p className=" text-default text-medium"></p>
                            <p className=" text-default text-medium"></p>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    if (!artistInfo || Object.keys(artistInfo).length === 0) {
        return <div>No artist information available</div>;
    }

    return (
        <div className="p-1 justify-center items-center flex flex-col w-100">
            <div className="flex flex-col items-start justify-start mt-2 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">


                <div className="pl-3 flex flex-col items-start justify-start text-left">
                    <h6 className="mt-2 text-white text-base">Credits</h6>
                </div>

                <div className="max-w-100 flex flex-col items-start justify-center mb-2">

                    {Object.entries(artistInfo).map(([artistId, artistData]) => (

                        <div key={artistId} className="max-w-100 flex flex-col items-start justify-center pl-3 mb-2">
                            <p className="mt-2 text-white text-base">{`${artistData.name ? artistData.name : " "}`}</p>
                            <p className=" text-default font-medium">{artistData.followers ? artistData.followers.toLocaleString() : " "}{' '}{`${artistData.followers ? "followers" : " "}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Credits;
