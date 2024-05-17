import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import Oig2 from '../images/OIG2.png';

const CurrentArtist = () => {
    const [artistInfo, setArtistInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            getCurrentArtist();
        }, 1000);

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

                <div className="flex items-start justify-start mt-4 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">

                    <div className="pl-3 flex flex-col items-start justify-start text-left">
                        <h6 className="mt-2 text-white text-base"></h6>



                        <div className="max-w-100 flex flex-col items-start justify-center mb-2">
                            <p className="mt-3 text-white text-base"></p>
                            <p className=" text-default font-medium"></p>
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

                <div className="flex items-start justify-start mt-4 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">

                    <div className="pl-3 flex flex-col items-start justify-start text-left">
                        <h6 className="mt-2 text-white text-base"></h6>



                        <div className="max-w-100 flex flex-col items-start justify-center mb-2">
                            <p className="mt-3 text-white text-base"></p>
                            <p className=" text-default font-medium"></p>
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
        <div className="p-1 justify-center items-center flex flex-col">
         {Object.entries(artistInfo).map(([theArtist, info]) => (
    <div key={theArtist} className="flex items-start justify-start mt-4 mx-0 bg-ffffff12 overflow-hidden rounded-lg w-100">

                        <div className="pl-3 flex flex-col items-start justify-start text-left">
                            <h6 className="mt-2 text-white font-medium">{`${info.name ? "About the artist" : " "}`}</h6>

                            <div className="mt-2 rounded-full flex items-start justify-start">
                                <Image
                                    src={info.image_url || Oig2}
                                    width="40%"
                                    height="40%"
                                    alt={info.name || 'hello'}
                                    className="rounded-full"
                                />
                            </div>

                            <div className="max-w-100 flex flex-col items-start justify-center mb-2">
                                <p className="mt-3 text-white text-base">{`${info.name ? info.name : " "}`}</p>
                                <p className=" text-default text-medium">{info.followers ? info.followers.toLocaleString() : " "}</p>
                                <p className=" text-default text-medium">{`${info.followers ? "monthly listeners" : " "}`}</p>
                            </div>

                        </div>

                    </div>
            ))}

        </div>
    );
};

export default CurrentArtist;
