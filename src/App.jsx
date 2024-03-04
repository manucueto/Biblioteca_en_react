import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Hheader from "./components/Hheader";
import Footer from './components/Footer'
import {Table,Button} from 'reactstrap'

class App extends React.Component {
  render() {
    return (
      <>
        <Hheader></Hheader>
        <Footer></Footer>
      </>
    );
  }
}

export default App;
