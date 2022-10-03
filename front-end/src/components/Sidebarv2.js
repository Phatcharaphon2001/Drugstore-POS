import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Sidebarv2() {
    return (
        <>
            <Navbar key="md" bg="light" expand="md" fixed="top">
            <Container fluid>
                <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-$"md"`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-$"md"`}
                aria-labelledby={`offcanvasNavbarLabel-expand-$"md"`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$"md"`}>
                    Offcanvas
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/sale/">Sale</Nav.Link>
                    <Nav.Link href="/inventory/">Inventory</Nav.Link>
                    <Nav.Link href="/report/">Report</Nav.Link>

                    <NavDropdown
                        title="{USER}"
                        align="end" 
                    >
                        <NavDropdown.Item href="/profile/">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout/" className="text-danger">Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
            </Navbar>
        </>
    );
}