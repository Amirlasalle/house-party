import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, div, Col, Button, Card, Image, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import AnimatedText from "./AnimatedText";
import createPages from "../images/Create-room-example.png"
import joinPages from "../images/Join-room-example.png"

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

const Info = (props) => {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return "Join Page";
  }
  function createInfo() {
    return "Create Page";
  }

  useEffect(() => {
    console.log("ran");
    return () => console.log("cleanup");
  });

  return (
    <Container fluid id="gradient" className="flex flex-col items-center justify-center bg-dark p-5 rounded-lg h-87-vh w-100 text-white overflow-y-scroll overflow-x-hidden">
      <div className="flex flex-col justify-center items-center text-center mt-5 h-full w-100 ">
        <div className="justify-center items-center mt-15">
          <div className="flex  items-center justify-center text-center mt-17">
            <AnimatedText
              text="What is Party Rock?"
              className="text-center mt-5 text-4xl"
            />
          </div>
          <Tabs
            defaultActiveKey="joinandcreate"
            transition={false}
            id="noanim-tab-example"
            variant='tabs'
            className="tabs h-10-vh mb-17 bg-dark flex-wrap inline-flex flex-row justify-center"
          >
            <Tab eventKey="joinandcreate" title="Join/Create" className="bg-dark tab">
              {/* <div className="flex  items-center justify-center text-center mt-10">
              <AnimatedText
                text="What is Party Rock?"
                className="text-center mt-5 text-4xl"
              />
            </div> */}

              <div className="justify-center items-center mt-15">
                <div className="text-center">
                  <p>{page === pages.JOIN ? joinInfo() : createInfo()}</p>
                </div>
              </div>

              <div className="justify-content-center align-items-center mt-3">
                <div className="text-center">
                  <Button
                    onClick={() => {
                      page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
                    }}
                    className="text-default bg-white"
                  >
                    {page === pages.CREATE ? (
                      <FontAwesomeIcon icon={faChevronRight} />
                    ) : (
                      <FontAwesomeIcon icon={faChevronLeft} />
                    )}
                  </Button>
                </div>
              </div>
              <div className="justify-content-center align-items-center mt-3">
                <div className="text-center">
                  <p>{page === pages.JOIN ? "Get a code from a friend, and join their room to jam out to the same song together! 😎 🎸" : page === pages.CREATE ? "Create a room, and invite your friends to jam out to the same songs together! 🤟" : null}</p>
                </div>
              </div>
              <div className="flex justify-center items-center mt-3">
                <div className=" p-3 bg-spotify-green rounded-lg flex items-center justify-center text-center">
                  <Image
                    src={
                      page === pages.JOIN ? joinPages :
                        page === pages.CREATE ? createPages : null
                    }
                    alt={
                      page === pages.JOIN ? "Join page" :
                        page === pages.CREATE ? "Create page" : "Party Rock"
                    }
                    width={300}
                    height={300}
                    priority="true"
                    className=" rounded-lg "
                  />
                </div>
              </div>

            </Tab>


            <Tab eventKey="hosting" title="Hosting" className="tab">

            </Tab>


            <Tab eventKey="features" title="Features" className="tab">

            </Tab>


            <Tab eventKey="friends" title="Friends" className="tab">

            </Tab>
          </Tabs>
        </div>




      </div>
    </Container>
  );
};

export default Info;
