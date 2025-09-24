import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function AppNavBar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Tasks</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        </Nav>
        <div className="d-flex gap-2 align-items-center">
          {isAuthenticated && <span className="text-light small">{user?.name}</span>}
          {!isAuthenticated ? (
            <Button size="sm" onClick={() => loginWithRedirect()}>Log In</Button>
          ) : (
            <Button
              size="sm"
              variant="outline-light"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Log Out
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
