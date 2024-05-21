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
        <div className="h-100-vh w-100-vw overflow-y-hidden m-0 ml-0 left-0 p-0 justify-center items-center"
        >

          <div className="items-center justify-center w-100 h-100-vh overflow-hidden">

            <div className="h-100-vh w-100 overflow-x-scroll overflow-y-hidden">
              <div className="h-100-vh w-100 inline-flex overflow-hidden">
              <div className="h-100-vh inline-flex flex-row justify-center items-center bg-black" >
                
                  <NavigationBar className="h-100-vh" />
              </div>
             
                <HomePage className="h-100-vh w-100" />
              </div>
            </div>
          </div>

        </div>
      </>
    );
  }
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App tab="home" />);