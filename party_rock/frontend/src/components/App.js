import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./HomePage";
import NavigationBar from "./NavigationBar";
import { Col, Container, Row } from "react-bootstrap"



export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Container fluid className="h-100 w-100 overflow-y-hidden m-0 justify-center items-center"
        >

          <div className="items-center justify-center w-100 overflow-y-hidden  my-2">
            <div className="h-100 w-100  overflow-x-scroll overflow-y-hidden">
              <div className="h-87-vh inline-flex overflow-y-hidden my-1"> 
                <NavigationBar className="h-87-vh"/>

                <HomePage className="h-87-vh " />
              </div>
            </div>
          </div>

        </Container>
      </>
    );
  }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App tab="home" />);