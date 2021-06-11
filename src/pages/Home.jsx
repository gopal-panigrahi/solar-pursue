import React from 'react'
import { Container, ListGroup, CardGroup, Card, Button } from 'react-bootstrap';
import RegionInfoForm from './RegionInfoForm.jsx';

function Home() {
  return (
    <Container className="mt-4 dark-background" fluid>
      <CardGroup bsPrefix='card-deck'>
        <Card className="mx-5" border="dark" >
          <Card.Header className="text-center"><Button size="lg" block>Region Information</Button></Card.Header>
          <Card.Body>
            <RegionInfoForm />
          </Card.Body>
        </Card>
        <Card className="mx-5" border="dark" >
          <Card.Header className="text-center"><Button size="lg" block>Instructions</Button></Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>1.If you are want to use our cloud then select cloud tab</ListGroup.Item>
            <ListGroup.Item>2.Otherwise,, start the docker using the command ...</ListGroup.Item>
            <ListGroup.Item>3.Enter all the information of the region.</ListGroup.Item>
            <ListGroup.Item>4.If you are want to use our cloud then select cloud tab.</ListGroup.Item>
            <ListGroup.Item>5.Otherwise,, start the docker using the command ..</ListGroup.Item>
            <ListGroup.Item>6.Enter all the information of the region.</ListGroup.Item>
          </ListGroup>
        </Card>
      </CardGroup>
    </Container >
  );
}

export default Home;