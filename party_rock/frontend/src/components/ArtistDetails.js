import React, { useState } from "react";
import { Card,  Image } from "react-bootstrap";

const ArtistDetails = (props) => {




  const ArtistInfo = () => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify//artists/{id}", requestOptions);
  };







  return (
    <>
      <div className="w-100 pl-0 d-flex justify-content-center">
      </div>
      <Card className="my-1 bg-transparent text-white overflow-hidden "
       style={{ width: '18rem' }}
      >
        <div className="my-2  bg-transparent text-white d-flex justify-content-center">
          <Image
            src={props.image_url}
            width="85%"
            height="85%"
            alt={Image}
            className="rounded-lg"
          />
        </div>

        <div className="pl-0 text-center">
          <h6 className="mt-2 pl-0 text-white font-semibold">{props.title}</h6>
          <div className="max-w-100 flex items-center justify-center">

          <p className="w-auto flex items-center justify-center small pl-0 px-6 text-default hover-text-white">{props.artist}</p>
          </div>


     
       
        </div>
       

      </Card>
    </>
  );
};

export default ArtistDetails;
