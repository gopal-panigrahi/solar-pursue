import React from 'react'
import { Navbar, Nav, NavDropdown, Container,Col ,Row} from 'react-bootstrap';

function Homepage() {
    return (
        <div>
          <div class="container-fluid">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Solar Pursue</a>
  </nav>
</div>
            <Navbar bg="dark" expand="lg">
            {/* <Navbar.Brand href="#home" >Solar Pursue</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
    <Container fluid style={{padding:'0'}}>           
      <Row>
        <Col >
    <Nav className="mr-auto flex-column " style={{height:'100vh',width:'20vh',background:"Red"}}>
      <Nav.Link href="#home">Home</Nav.Link>
      <NavDropdown title="Classified images" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
    </Col>
    <Col lg="true">datatftad</Col>
    </Row></Container>
    
  </Navbar.Collapse>
</Navbar>
        </div>
    )
}

export default Homepage;
