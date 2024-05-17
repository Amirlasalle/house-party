import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

const FollowedArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchArtists();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const fetchArtists = () => {
        fetch('/spotify/get-followed-artists')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch followed artists');
                }
                return response.json();
            })
            .then(data => {
                if (!data || !data.artists) {
                    throw new Error('No artists found');
                }
                setArtists(data.artists);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching followed artists:', error);
                setError(error.message);
                setLoading(false);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Followed Artists</h2>
            <ul>
                {artists.map((artist, index) => (
                    <li key={index}>
                        <Image
                            src={artist.images.length > 0 ? artist.images[0].url : ''}
                            alt={artist.name}
                            roundedCircle
                        />
                        <div>
                            <h3>{artist.name}</h3>
                            <p>Followers: {artist.followers.total}</p>
                            <p>Popularity: {artist.popularity}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FollowedArtists;
