import React from 'react'
import { Navbar, Nav,Row,Container, NavDropdown ,Col ,Card,CardGroup,CardDeck } from 'react-bootstrap';
//import Home from './components/pages/home.js';

function Sidenav() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col lg="True">
            <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-side-nav" />
            <Navbar.Collapse id="basic-side-nav">
            <Nav className="mr-auto flex-column"style={{height:'100vh',width:'20vh',background:"Red"}}>
                        <Nav.Link href="#home">Statistical Report</Nav.Link>
                        
                        <NavDropdown title="Classified Images" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/components/pages/Home">Clear Images</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Unclear Images</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </Col>
            <Col>
            <CardDeck>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="holder.js/100px160" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardDeck>
            </Col>
            </Row>
            </Container>
                   
        </div>
    )
}

export default Sidenav;
