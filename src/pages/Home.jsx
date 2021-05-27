import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import RegionInfoForm from './RegionInfoForm.jsx';

function Home() {
  return (
    <Container className="p-0 m-0" fluid>
      <Row className="p-0 m-0">
        <Col className="p-0 m-0" md style={{ backgroundColor: '	#e6f2ff ' }}>
          <Card className="my-4 mx-auto" border="light" style={{ width: '33rem' }}>
            <Card.Header className="text-center"><Button size="lg" block>Region Information</Button></Card.Header>
            <Card.Body>
              <RegionInfoForm />
            </Card.Body>
          </Card>
        </Col>
        <Col className="p-0 m-0" md style={{ backgroundColor: '	#e6f2ff' }} >
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
  );
}

export default Home;