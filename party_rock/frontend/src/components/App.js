// import React, { Component } from "react";
// import { createRoot } from 'react-dom/client';
// import HomePage from "./HomePage";
// import NavigationBar from "./NavigationBar";
// import Draggable from 'react-draggable';
// import { Col, Container, Row } from "react-bootstrap"



// export default class App extends Component {
//   constructor(props) {
//     super(props);
//   }


//   render() {
//     return (
//       <>
//         <div className="h-100-vh w-100-vw overflow-y-hidden m-0 ml-0 left-0 p-0 justify-center items-center"
//         >

//           <div className="items-center justify-center w-100 h-100-vh overflow-hidden">

//             <div className="h-100-vh w-100 overflow-x-scroll overflow-y-hidden">
//               <div className="h-100-vh w-100 inline-flex overflow-hidden">

//               <div className="h-100-vh inline-flex flex-row justify-center items-center bg-black" >
//                   <NavigationBar className="h-100-vh" />
//               </div>

//                 <HomePage className="h-100-vh w-100" />
//               </div>
//             </div>
//           </div>

//         </div>
//       </>
//     );
//   }
// }

// const appDiv = document.getElementById("app");
// const root = createRoot(appDiv);
// root.render(<App tab="home" />);

// import React, { useEffect, useRef } from "react";
// import { createRoot } from 'react-dom/client';
// import HomePage from "./HomePage";
// import NavigationBar from "./NavigationBar";
// import Draggable from 'react-draggable';


// const App = () => {


//   return (
//     <div className="h-100-vh w-100-vw overflow-y-hidden m-0 ml-0 left-0 p-0 justify-center items-center">
//       <div className="items-center justify-center w-100 h-100-vh overflow-hidden">
//         <div className="h-100-vh w-100 overflow-x-scroll overflow-y-hidden">
//           <div className="h-100-vh w-100 relative inline-flex overflow-hidden">
//             <div id="gradient" className="h-50px w-50px top-0 left-0 absolute cursor-pointer rounded-full bg-spotify-green z-10"></div>
//             <div className="h-100-vh inline-flex flex-row justify-center items-center bg-black">
//               <NavigationBar className="h-100-vh" />
//             </div>
//             <HomePage className="h-100-vh w-100" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const appDiv = document.getElementById("app");
// const root = createRoot(appDiv);
// root.render(<App tab="home" />);
// import React from 'react';
// import Draggable from 'react-draggable';

// class App extends React.Component {


//   render() {
//     return (
//       <Draggable
//         axis="x"
//         handle=".handle"
//         defaultPosition={{x: 0, y: 0}}
//         position={null}
//         grid={[25, 25]}
//         scale={1}
//         onStart={this.handleStart}
//         onDrag={this.handleDrag}
//         onStop={this.handleStop}>
//         <div>
//           <div className="handle">Drag from here</div>
//           <div>This readme is really dragging on...</div>
//         </div>
//       </Draggable>
//     );
//   }
// }

// ReactDOM.render(<App/>, document.body);

import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./HomePage";
import NavigationBar from "./NavigationBar";
import Draggable from 'react-draggable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faUsers, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
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
                <Draggable
                  axis="both"
                  handle=".handle"
                  defaultPosition={{ x: 0, y: 0 }}
                  position={null}
                  scale={1}
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}>
                  <div>
                    <div className="handle">
                    <div id="gradient" className="flex items-center justify-center h-50px w-50px absolute cursor-pointer rounded-full bg-spotify-green z-10">
                    <FontAwesomeIcon icon={faUsers} size="lg" className="" />
                    </div>
                    </div>
                  </div>
                </Draggable>
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