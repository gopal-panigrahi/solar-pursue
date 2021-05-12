import React from 'react'
import { Navbar, Nav,Row,Container, NavDropdown } from 'react-bootstrap';
//import Home from './components/pages/home.js';

function Sidenav() {
    return (
        <div>
            
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

                   
        </div>
    )
}

export default Sidenav;
