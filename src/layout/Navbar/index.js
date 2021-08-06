import { useUser } from '@auth0/nextjs-auth0';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';

const NavbarLayout = () => {
  const { user } = useUser();
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">COLA-BOOKING</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Rooms</Nav.Link>
          {user && <Nav.Link href="/booking">My Bookings</Nav.Link>}
        </Nav>
        {user && (
          <NavDropdown title={`${user.nickname} ${user.given_name}`} id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
            <NavDropdown.Item href="/api/auth/logout">Disconnect</NavDropdown.Item>
          </NavDropdown>
        )}
        {!user && (
          <Nav>
            <Button variant="dark" href="/api/auth/login">
              {' '}
              Login{' '}
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavbarLayout;
