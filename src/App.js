import React from 'react';
import './App.css';
// import Homepage from './components/homepage';
// import Page from './components/page';
//import Sample from './components/sample';
//import Homepage from './components/homepage';

//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import sidenav from './components/Sidenav';
//import Products from './pages/Products';
//import { Col,Row,Container} from 'react-bootstrap';
// import Sample from './components/sample';
import SideNav from './components/SideNav';
import Uploadpage from './pages/UploadPage';
import { Container, Col, Row } from 'react-bootstrap';

function App() {
  return (
    <>
      <Container className="m-0 p-0 bg-danger" fluid>
        <Row>
          <Col className='pr-0' md={3} >
            <SideNav />
          </Col>
          <Col >
            <Uploadpage />
          </Col>
        </Row>
      </Container >
    </>
  );
}

export default App;