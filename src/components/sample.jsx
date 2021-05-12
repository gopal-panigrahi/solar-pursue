import React from 'react'
import { Container, Navbar ,Nav,Col, Row, NavDropdown, Jumbotron} from 'react-bootstrap';

function Sample() {
    return (
  <div>
          
    <Nav class="navbar navbar-light bg-light " >
                                             {'Solar Pursue'}
      </Nav>
           
    < Container fluid style={{backgroundColor:'red'}} >
  
      <Row >
    
        <Col lg="True"  >
          
            <Navbar bg="dark" variant="dark" >
              <Navbar.Brand href="#home" style={{height:'1000px'}}> Statistical Report</Navbar.Brand>
              <Navbar.Brand href="#images">
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">clear images</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Unclear images</NavDropdown.Item></NavDropdown>
              </Navbar.Brand>
    
            </Navbar>
          
        </Col>
  
        <Col>Data</Col>
      </Row>
      
    </Container>
</div>
    )
}

export default Sample
