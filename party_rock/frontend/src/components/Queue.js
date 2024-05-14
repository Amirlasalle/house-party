// import React, { useState, useEffect } from 'react';
// import Oig2 from "../images/OIG2.png"
// import { Card, ProgressBar, Image } from "react-bootstrap";

// const Queue = () => {
//     const [queue, setQueue] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         getUserQueue();
//     }, []);

//     const getUserQueue = () => {
//         fetch("/spotify/queue")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch queue');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setQueue(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 setError(error.message);
//                 setLoading(false);
//             });
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <>
//             {queue && queue.queue.length > 0 ? (
//                 <div className='flex flex-col items-start justify-start text-white w-100'>
//                     <div className="flex items-start justify-start w-100">
//                         <h6 className="mt-2 w-100 text-left text-white flex items-start justify-start font-medium">Next up</h6>
//                     </div>

//                     <div>
//                         <ul className='pl-0 '>
//                             {queue.queue.map((item) => (
//                                 <li key={item.id} className='inline-flex w-100'>
//                                     <div className="flex justify-start items-start">
//                                         <Image
//                                             src={item.image_url || Oig2}
//                                             width="40"
//                                             height="40"
//                                             alt={item.name}
//                                             className="rounded-lg"
//                                         />

//                                         <div className="flex flex-col justify-start items-start">
//                                             {item.name}
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ) : (
//                ' '
//             )}
//         </>
//     );
// };

// export default Queue;
import React, { useState, useEffect } from 'react';
import Oig2 from "../images/OIG2.png"
import { Card, ProgressBar, Image } from "react-bootstrap";

const Queue = () => {
    const [queue, setQueue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-1 justify-center items-center flex flex-col w-18rem overflow-x-hidden">
            {queue && queue.queue.length > 0 ? (
                <div className='flex flex-col items-start justify-start text-white w-18rem'>
                    <div className="flex items-start justify-start ml-2">
                        <h6 className="mt-2 text-left text-white flex items-start justify-start font-medium">Next up</h6>
                    </div>

                    <div>
                        <ul className='pl-0 '>
                            {queue.queue.map((item, index) => (
                                <li key={index} className='p-1 inline-flex w-17rem hover-bg-ffffff12 rounded-lg cursor-pointer justify-start items-start text-ellipsis-overflow'>
                                    <div className="ml-1 flex justify-start items-center">
                                        <Image
                                            src={item.image_url || Oig2}
                                            width="50"
                                            height="50"
                                            alt={item.name}
                                            className="rounded-lg"
                                        />

                                        <div className="flex flex-col justify-start items-start ml-2">
                                            <div className="flex items-start justify-start w-100">
                                                <h6 className="mt-2 multi-line-ellipsis text-left text-white flex items-start justify-start  font-medium">{item.name}</h6>
                                            </div>
                                            <div className=" flex items-start justify-start">
                                                <h6 className=" multi-line-ellipsis text-left text-white flex items-start justify-start font-medium">{item.name}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                ' '
            )}
        </div>
    );
};

export default Queue;
