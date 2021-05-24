import React from 'react';
import { Card, Accordion, Nav, Navbar } from 'react-bootstrap';

const SideNav = function (props) {
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Navbar.Toggle aria-controls="sidebar-navbar-nav" />
        <Navbar.Collapse id="sidebar-navbar-nav">
          <Nav defaultActiveKey="0" className="flex-column w-100">
            <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  Statistical Report
                                </Card.Header>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Classified Images
                                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <Card.Text>Cleared Images</Card.Text>
                    <Card.Text>Uncleared Images</Card.Text>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default SideNav;