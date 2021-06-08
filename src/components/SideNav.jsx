import React from 'react';
import { Card, Accordion, Nav, Navbar } from 'react-bootstrap';

const SideNav = function ({ goToPage }) {
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
        <Navbar.Collapse id="sidebar-navbar-nav">
          <Nav defaultActiveKey="0" className="flex-column w-100">
            <Card>
              <Card.Header >
                <Nav.Link onClick={() => goToPage('reportPage')}>Statistical Report</Nav.Link>
              </Card.Header>
            </Card>
            <Card>
              <Card.Header>
                <Nav.Link onClick={() => goToPage('imagePage')}>Classified Images</Nav.Link>
              </Card.Header>
            </Card>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default SideNav;