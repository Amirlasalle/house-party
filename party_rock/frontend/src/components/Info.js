import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import AnimatedText from "./AnimatedText";

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
    <Container fluid className="flex flex-col items-center justify-center bg-dark p-5 rounded-lg h-87-vh w-100 text-white">
    <div className="flex flex-col justify-center items-center text-center my-5 h-87-vh w-100">
 
    <div className="flex items-center justify-center text-center">
          <AnimatedText
            text="What is Party Rock?"
            className="text-center text-4xl"
          />
        </div>

      <Row className="justify-content-center align-items-center mt-3">
        <Col xs={12} className="text-center">
          <p>{page === pages.JOIN ? joinInfo() : createInfo()}</p>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center mt-3">
        <Col xs={12} className="text-center">
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
        </Col>
      </Row>
      </div>
    </Container>
  );
};

export default Info;
