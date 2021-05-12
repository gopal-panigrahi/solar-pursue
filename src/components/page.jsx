import React from 'react'
import { Navbar, Nav, NavDropdown, Container,Col ,Row} from 'react-bootstrap';

function Page() {
    return (
        <div>
         
          
          < div class="container-fluid bg-danger h-100">
            
            <div class="classRow" >

              <div class="classCol-lg" >
      
                <Navbar bg="dark" variant="dark">
                  <Navbar.Brand href="#home"> Statistical Report</Navbar.Brand>
                </Navbar>

                  <Navbar bg="dark">
                    <Navbar.Brand href="#images">
                      <NavDropdown title="Images" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Clear images</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Unclear images</NavDropdown.Item></NavDropdown>
                    </Navbar.Brand>
                  </Navbar>
      
              </div>

              
            </div>
            </div>
          </ div>
      
    )
}

export default Page;
