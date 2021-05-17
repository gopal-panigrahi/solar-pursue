//import logo from './logo.svg';
//import './App.css';
import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  return (
    <>
      {/* <div>
        <nav style={{ display: "grid", gridTemplateColumns: "50% 50%", alignItems: "center", backgroundColor: "lightblue", align: "center", height: "10vh", }}>
          <h3>  SOLAR PURSUE</h3>
          <ul style={{ display: "flex", justifyContent: "space-around", liststyle: "none", paddingRight: "150px", }}>
            <Button>Bulk</Button>
            <Button>cloud</Button>
            <Button>Single</Button>
            <Button>About</Button>
          </ul>
        </nav>
      </div> */}

      <Container className="p-0 m-0" fluid>
        <Row className="p-0 m-0">
          <Col className="p-0 m-0" md style={{ width: '80rem', height: 580, backgroundColor: '	#e6f2ff ' }}>
            <Card className="mt-4 mx-auto" border="light" style={{ width: '33rem', height: '32rem' }}>
              <Card.Header className="text-center"><Button size="lg" block>Region Information</Button></Card.Header>
              <Card.Body>
                <Card.Title>Light Card Title</Card.Title>
                <Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="p-0 m-0" md style={{ width: "80rem", height: 580, backgroundColor: '	#e6f2ff' }} >
            <Card className="mt-4 mx-auto" border="light" style={{ width: '34rem', height: '32rem' }}>
              <Card.Header className="text-center"><Button size="lg" block>Instructions</Button></Card.Header>
              <Card.Body>
                <Card.Text>
                  1.If you are want to use our cloud then select cloud tab  <br />
                  2.Otherwise,, start the docker using the command ... <br />
                  3.Enter all the information of the region.<br />
                  4.If you are want to use our cloud then select cloud tab.<br />
                  5.Otherwise,, start the docker using the command .. <br />
                  6.Enter all the information of the region<br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;