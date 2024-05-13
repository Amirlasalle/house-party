import React, { useState, useEffect } from 'react';

const Queue = () => {
    const [queue, setQueue] = useState(null);

    useEffect(() => {
        getUserQueue();
    }, []);

    const getUserQueue = () => {
        fetch("/spotify/queue")
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to fetch queue');
            }
            return response.json();
          })
          .then((data) => {
            setQueue(data);
          })
          .catch((error) => {
            console.error("Error fetching queued songs:", error);
          });
    };

    return (
        <div className='text-white'>
            {queue ? (
                <div>
                    <h2>Queue</h2>
                    <ul>
                        {queue.queue.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading queue...</p>
            )}
        </div>
    );
};

export default Queue;
