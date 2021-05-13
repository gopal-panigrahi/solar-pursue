import React from 'react';
import './App.css';
import Homepage from './components/homepage';
import Page from './components/page';
//import Sample from './components/sample';
//import Homepage from './components/homepage';

//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import sidenav from './components/Sidenav';
//import Products from './pages/Products';
//import { Col,Row,Container} from 'react-bootstrap';
import Sample from './components/sample';
import Sidenav from './components/Sidenav';
import Uploadpge from './components/uploadpge';

function App() {
  return (
    <>
    {/* <Sample/> */}
    {/* <Sidenav/> */}
    <Uploadpge/>
    </>
  );
}

export default App;