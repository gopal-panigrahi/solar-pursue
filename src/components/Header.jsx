import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <>
            <Navbar style={{ backgroundColor: "#55cce7" }} expand="lg">
                <Navbar.Brand href="#home">SOLAR PURSUE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" className="bg-primary text-white px-3 rounded mx-2">Bulk</Nav.Link>
                        {/* <Nav.Link className="bg-primary text-white px-3 rounded mx-2">cloud</Nav.Link> */}
                        <Nav.Link href="#single" className="bg-primary text-white px-3 rounded mx-2">Single</Nav.Link>
                        <Nav.Link href="#about" className="bg-primary text-white px-3 rounded mx-2">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;
