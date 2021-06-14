import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/sun.png'
function Header() {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="py-2 shadow-box" expand="lg">
                <Navbar.Brand className="pl-2" href="#home">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Solar Pursue
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home" className="bg-primary text-white px-3 rounded mx-2 shadow-box">Bulk</Nav.Link>
                        <Nav.Link href="#singleImage" className="bg-primary text-white px-3 rounded mx-2 shadow-box">Single</Nav.Link>
                        <Nav.Link href="#about" className="bg-primary text-white px-3 rounded mx-2 shadow-box">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;
