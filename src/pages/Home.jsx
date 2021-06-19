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
            <ListGroup.Item>1. This software is used for generating statistical report from the sky image dataset with name as timestamp.</ListGroup.Item>
            <ListGroup.Item>2. Start the server by running start_server script</ListGroup.Item>
            <ListGroup.Item>3. Enter all the information of the region which the dataset belongs to. </ListGroup.Item>
            <ListGroup.Item>4. If you are want to use our cloud then select cloud tab.</ListGroup.Item>
            <ListGroup.Item>5. Upload the folder or zip and submit. </ListGroup.Item>
            <ListGroup.Item>6. Click on the Start Processing button. </ListGroup.Item>
            <ListGroup.Item>6. After processing is completed, Generate the report. </ListGroup.Item>
            <ListGroup.Item>7. Add comments to the report and take the print. </ListGroup.Item>
            <ListGroup.Item>8. User can also use the single image page. </ListGroup.Item>
          </ListGroup>
        </Card>
      </CardGroup>
    </Container >
  );
}

export default Home;