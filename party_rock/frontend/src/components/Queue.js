import React, { useState, useEffect } from 'react';
import Oig2 from "../images/OIG2.png";
import { Image } from "react-bootstrap";

const Queue = () => {
    const [queue, setQueue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            getUserQueue();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getUserQueue = () => {
        fetch("/spotify/queue")
            .then((response) => {
                if (response.status === 204) {
                    return [];
                }
                if (!response.ok) {
                    throw new Error('Failed to fetch queue');
                }
                return response.json();
            })
            .then((data) => {
                setQueue(data || []);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    const handleSongClick = (song_id) => {
        fetch('/spotify/play-queued-song', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ song_id: song_id }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to play the song');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data.message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    if (loading) {
        return (
            <div className="p-1 mt-1 justify-center items-center flex flex-col w-18rem overflow-x-hidden">
                <div className='flex flex-col items-start justify-start w-18rem'>
                    <div className="flex items-start justify-start ml-2">
                        <h6 className="mt-2 text-left text-white flex items-start justify-start font-medium">Next up</h6>
                    </div>

                    <div>
                        <ul className='pl-0 '>
                            <li className='p-1 my-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg"
                                    />
                                </div>
                            </li>
                            <li className='p-1 my-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg"
                                    />
                                </div>
                            </li>
                            <li className='p-1 my-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg"
                                    />
                                </div>
                            </li>
                            <li className='p-1 mt-2 inline-flex w-17rem bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis'>
                                <div className="ml-1 flex justify-start items-center">
                                    <div className="bg-ffffff12 w-3rem h-3rem rounded-lg"
                                    />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return ' ';
    }

    if (!queue || queue.length === 0) {
        return <p className='text-white'>No items in the queue.</p>;
    }

    return (
        <div className="p-1 justify-center items-center flex flex-col w-18rem overflow-x-hidden">
            <div className='flex flex-col items-start justify-start w-18rem'>
                <div className="flex items-start justify-start ml-2">
                    <h6 className="mt-2 text-left text-white flex items-start justify-start font-medium">Next up</h6>
                </div>

                <div>
                    <ul className='pl-0 '>
                        {queue.map((item, index) => (
                            <li key={index} className='p-1 inline-flex w-17rem hover-bg-ffffff12 rounded-lg cursor-pointer justify-start items-start multi-line-ellipsis' onClick={() => handleSongClick(item.id)}>
                                <div className="ml-1 flex justify-start items-center">
                                    <Image
                                        src={item.image_url || Oig2}
                                        width="50"
                                        height="50"
                                        alt={item.name}
                                        className="rounded-lg"
                                    />

                                    <div className="flex flex-col justify-start items-start ml-2">
                                        <div className="flex items-start justify-start">
                                            <p className="text-left elipsis-line text-white flex items-start justify-start text-base">
                                                <span className='text-base text-left items-start justify-start elipsis'>{item.name}</span>
                                            </p>
                                        </div>
                                        <div className="flex items-start justify-start">
                                            <p className="text-left elipsis-line text-default flex items-start justify-start">
                                                <span className='text-medium text-default text-left items-start justify-start elipsis'>{item.artist}</span>
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

export default Queue;

