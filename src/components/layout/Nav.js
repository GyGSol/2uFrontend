import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function nav() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/home">2U Ibiza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/properties">Properties</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Row className="d-flex flex-row-reverse">
          <Col xs={12} sm={4} md={4}>
              <Image src="logo_web.png" fluid />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default nav;
