import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
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
    <Container fluid className="mt-5 bg-dark flex justify-center items-center rounded-lg py-5 px-4 text-white">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={4} className="text-center">
          <Button to="/" as={Link} className="bg-link mx-1 text-white btn-circle hover-bright-lg">
          <FontAwesomeIcon icon={faHouse} />
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-center mt-3">
        <Col xs={12} className="text-center">
          <h4>What is Party Rock ?</h4>
        </Col>
      </Row>

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
    </Container>
  );
};

export default Info;
