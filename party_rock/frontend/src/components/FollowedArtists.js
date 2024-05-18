import React, { useState, useEffect } from 'react';
import { Image } from "react-bootstrap";
import Oig2 from "../images/OIG2.png";

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

    const getFollowedArtists = () => {
        fetch("/spotify/followed-artists")
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch followed artists');
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
            <div className="p-1 mt-1 justify-center items-center flex flex-col w-18rem overflow-x-hidden">
                <div className='flex flex-col items-start justify-start w-18rem'>
                    <div className="flex items-start justify-start ml-2">
                        <h6 className="mt-2 text-left text-white flex items-start justify-start font-medium">Followed Artists</h6>
                    </div>
                    <div>
                        <ul className='pl-0 '>
                            <li className='p-1 my-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg" />
                                </div>
                            </li>
                            <li className='p-1 my-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg" />
                                </div>
                            </li>
                            <li className='p-1 my-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg" />
                                </div>
                            </li>
                            <li className='p-1 mt-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    if (!artists || artists.length === 0) {
        return <p className='text-white'>No followed artists.</p>;
    }

    return (
        <div className="p-1 justify-center items-center flex flex-col w-18rem overflow-x-hidden">
            <div className='flex flex-col items-start justify-start w-18rem'>
                <div className="flex items-start justify-start ml-2">
                    <h6 className="mt-2 text-left text-white flex items-start justify-start font-medium">Followed Artists</h6>
                </div>
                <div>
                    <ul className='pl-0 '>
                        {artists.map((artist, index) => (
                            <li key={index} className='p-1 inline-flex w-17rem hover-bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <Image
                                        src={artist.image_url || Oig2}
                                        width="50"
                                        height="50"
                                        alt={artist.name}
                                        className="rounded-lg"
                                    />
                                    <div className="flex flex-col justify-start items-start ml-2">
                                        <div className="flex items-start justify-start">
                                            <p className="text-left elipsis-line text-white flex items-start justify-start text-base">
                                                <span className='text-base text-left items-start justify-start elipsis'>{artist.name}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-start justify-start">
                                            <p className="text-left elipsis-line text-default flex items-start justify-start">
                                                <span className='text-medium text-default text-left items-start justify-start elipsis'>{artist.genres.join(', ')}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FollowedArtists;
