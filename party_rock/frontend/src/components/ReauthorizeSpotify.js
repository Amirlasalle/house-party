import React from 'react';

const ReauthorizeSpotify = () => {
    const handleReauthorize = () => {
        fetch('/spotify/get-auth-url')
            .then((response) => response.json())
            .then((data) => {
                window.location.href = data.url;
            });
    };

    return (
        <div onLoad={handleReauthorize} className="">
        </div>
    );
};

export default ReauthorizeSpotify;
