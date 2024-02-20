import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AddRecord from '../../../pages/AddRecord'

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
 
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/chart">Chart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
   
    </Navbar>
  );
}

export default BasicExample;