import React, { useState } from 'react';
import { ButtonGroup, NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'

function OffcanvasExample() {

  const navigate = useNavigate()

  const [click, setClick] = useState(true);

  const handleClick = () => setClick(!click);

  const  handleLogout = () => {
    localStorage.removeItem("Auth-Token");
    localStorage.removeItem("user");
    navigate("/")
  }

  return (
    <Navbar expand="lg" style={{}}>
      <Container>
          <NavLink as={Link} to="/" className="nav-logo" onClick={handleClick}>
            <span>Bulk Email Tool</span>
          </NavLink>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              Bulk Mailing
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body >
            <Nav className={click? "active justify-content-end flex-grow-1 pe-3" : "justify-content-end flex-grow-1 pe-3"}>
              <NavLink as={Link} to="/home" className='text' onClick={handleClick}>Home</NavLink>
              <NavDropdown
                title="Compose"
                id={`offcanvasNavbarDropdown-expand-lg`}
                className='text'
              >
                <NavDropdown.Item as={Link} to="/send-mail" onClick={handleClick}>Send Mail</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/send-bulk-mail" onClick={handleClick}>
                  Send Bulk Mails
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink as={Link} to="/chart" className='text' onClick={handleClick}>Chart</NavLink>
              <NavLink as={Link} to="/sent-items" className='text' onClick={handleClick}>Sent Items</NavLink>
              <NavLink as={Link} to="/settings" className='text' onClick={handleClick}>Settings</NavLink>
            </Nav>
            <Button onClick={handleLogout} variant="danger">Log Out</Button>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default OffcanvasExample;
