// import React, { useState, useEffect, useRef } from 'react';
// import { Image } from "react-bootstrap";
// import Oig2 from "../images/OIG2.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faCircleUser, faBars, faLanguage, faGlobe, faArrowLeft, faSpinner, faDirections, faPhone } from '@fortawesome/free-solid-svg-icons';

// const SearchSong = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSearch = () => {
//         setLoading(true);
//         fetch(`/spotify/search?query=${searchQuery}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Create or join a room to use this feature! 😎 ');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setSearchResults(data.songs);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error.message);
//                 setLoading(false);
//             });
//     };


//     useEffect(() => {
//         if (searchQuery) {
//             handleSearch();
//         } else {
//             setSearchResults([]);
//         }
//     }, [searchQuery]);

//     const handleChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const outSideSearchBar = (event) => {
//         if (resetColor.current && !resetColor.current.contains(event.target)) {
//             setBackgroundColor('#fff');
//         }
//     };
//     useEffect(() => {
//         document.addEventListener('click', outSideSearchBar);

//         return () => {
//             document.removeEventListener('click', outSideSearchBar);
//         };
//     }, []);

//     const [backgroundColor, setBackgroundColor] = useState('#f3f2f2');
//     const resetColor = useRef(null);

//     const changeBgColor = () => {
//         setBackgroundColor('#f3f2f2');
//     };



//     return (
//         <div className="p-1 pt-0 justify-center items-center flex flex-col w-100 overflow-x-hidden">
//             <div className='flex flex-col items-start justify-start w-100'>
//                 <div className="w-100 mb-5 flex flex-col items-center justify-center">


//                     <div className="w-100 flex flex-col justify-start items-start ">
//                         <div className="h-4rem w-100 z-2 flex justify-center items-start">
//                             <div className="h-4rem bg-spotify-green w-100 absolute z-2 flex justify-center items-start">
//                                 <div
//                                     ref={resetColor}
//                                     variant='light'
//                                     style={{ backgroundColor }}
//                                     className='form-div  mx-3 p-3 text-left '
//                                     onClick={changeBgColor}>
//                                     <span className="mx-1 ">
//                                         <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="faMagGlass text-left" />
//                                     </span>
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={handleChange}
//                                         placeholder="Search for songs..."
//                                         className='w-100 form-input search-btn-form'
//                                     />
//                                 </div>
//                             </div>
//                         </div>


//                         <div className="rounded-lg h-50 mb-1 w-100 z-1 overflow-y-hidden overflow-x-hidden flex justify-center items-center">
//                             <div className="h-100 mt-3 w-100 flex flex-col justify-center items-center overflow-y-scroll">
//                                 <div>
//                                     {loading &&
//                                         <div>
//                                             <p className='pl-0 text-center'>
//                                               <FontAwesomeIcon icon={faSpinner}
//                                               className='text-dark' spin />
//                                             </p>
//                                         </div>}
//                                         {error &&
//                                         <div>
//                                             <p className='text-dark pl-0 text-center'>
//                                             Create or join a room to use this feature! 😎 
//                                             </p>
//                                         </div>}
//                                 </div>
//                                 {searchResults.map((item, index) => (
//                                     <div key={index} className='p-1 inline-flex w-100 hover-bg-ffffff12 rounded-lg cursor-pointer justify-start items-center multi-line-ellipsis'>
//                                         <div className="ml-1 flex justify-start items-center">
//                                             <Image
//                                                 src={item.image_url || Oig2}
//                                                 width="50"
//                                                 height="50"
//                                                 alt={item.name}
//                                                 className="rounded-lg"
//                                             />
//                                             <div className="flex flex-col justify-start items-start ml-2">
//                                                 <div className="flex items-start justify-start">
//                                                     <p className="text-left elipsis-line text-white flex items-start justify-start text-base">
//                                                         <span className='text-base text-left items-start justify-start elipsis'>{item.name}</span>
//                                                     </p>
//                                                 </div>
//                                                 <div className="flex items-start justify-start">
//                                                     <p className="text-left elipsis-line text-black flex items-start justify-start">
//                                                         <span className='text-medium text-black text-left items-start justify-start elipsis'>{item.artist}</span>
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default SearchSong;
import React, { useState, useEffect, useRef } from 'react';
import { Image } from "react-bootstrap";
import Oig2 from "../images/OIG2.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchSong = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        setLoading(true);
        fetch(`/spotify/search?query=${searchQuery}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Create or join a room to use this feature! 😎 ');
                }
                return response.json();
            })
            .then((data) => {
                setSearchResults(data.songs);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (searchQuery) {
            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSongClick = (song_id) => {
        fetch('/spotify/play-specific-song', {
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
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };
    
    const outSideSearchBar = (event) => {
        if (resetColor.current && !resetColor.current.contains(event.target)) {
            setBackgroundColor('#fff');
        }
    };
    useEffect(() => {
        document.addEventListener('click', outSideSearchBar);

        return () => {
            document.removeEventListener('click', outSideSearchBar);
        };
    }, []);

    const [backgroundColor, setBackgroundColor] = useState('#f3f2f2');
    const resetColor = useRef(null);

    const changeBgColor = () => {
        setBackgroundColor('#f3f2f2');
    };

    return (
        <div className="p-1 pt-0 justify-center items-center flex flex-col w-100 overflow-x-hidden">
            <div className='flex flex-col items-start justify-start w-100'>
                <div className="w-100 mb-5 flex flex-col items-center justify-center">
                    <div className="w-100 flex flex-col justify-start items-start ">
                        <div className="h-4rem w-100 z-2 flex justify-center items-start">
                            <div className="h-4rem bg-spotify-green w-100 absolute z-2 flex justify-center items-start">
                                <div
                                    ref={resetColor}
                                    variant='light'
                                    style={{ backgroundColor }}
                                    className='form-div  mx-3 p-3 text-left '
                                    onClick={changeBgColor}>
                                    <span className="mx-1 ">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className="faMagGlass text-left" />
                                    </span>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleChange}
                                        placeholder="Search for songs..."
                                        className='w-100 form-input search-btn-form'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-lg h-50 mb-1 w-100 z-1 overflow-y-hidden overflow-x-hidden flex justify-center items-center">
                            <div className="h-100 mt-3 w-100 flex flex-col justify-center items-center overflow-y-scroll">
                                <div>
                                    {loading && (
                                        <div>
                                            <p className='pl-0 text-center'>
                                                <FontAwesomeIcon icon={faSpinner} className='text-dark' spin />
                                            </p>
                                        </div>
                                    )}
                                    {error && (
                                        <div>
                                            <p className='text-dark pl-0 text-center'>
                                                {error}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                {searchResults.map((item, index) => (
                                    <div key={index} className='p-1 inline-flex w-100 hover-bg-ffffff12 rounded-lg cursor-pointer justify-start items-center multi-line-ellipsis' onClick={() => handleSongClick(item.id)}>
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
                                                    <p className="text-left elipsis-line text-black flex items-start justify-start">
                                                        <span className='text-medium text-black text-left items-start justify-start elipsis'>{item.artist}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSong;
