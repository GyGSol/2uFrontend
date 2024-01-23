import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function Contact() {

  const [contacto, setContacto] = useState({});

  useEffect(() => {
    const cargarFoto = async () => {
      const response = await axios.get("http://localhost:3030/api/contactos");
      setContacto(response.data);
    };
    cargarFoto();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={6} md={6}>
          <h2>Contact: </h2><h5>{contacto.texto1}</h5>
          <Form className="mt-4">
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Your Name</Form.Label>
              <Form.Control placeholder="Enter Name" />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Row>

            <FloatingLabel
              className="mb-4"
              controlId="floatingTextarea"
              label="Comments"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
            <Row>
              <Button className="mb-4" variant="primary" type="submit">
                Contact Me
              </Button>
            </Row>
            <Row className="mb-4">
              <h5>Email: info@2uibiza.com</h5>
            </Row>
            <Row className="mb-4">
              <Button
                href="https://wa.me/+34687261275?text=I'm%20interested%20about%20a%20listing%20of%20properties"
                variant="outline-success"
              >
                <img
                  alt="Chat on WhatsApp"
                  src="WhatsAppButtonGreenLarge.png"
                />
                Chat on WhatsApp
              </Button>
            </Row>
          </Form>
        </Col>
        <Col lg={6} md={6} className="d-flex flex-row-reverse">
          <Image src={contacto.imagen} rounded />
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
