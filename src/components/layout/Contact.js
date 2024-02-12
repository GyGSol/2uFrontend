import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";

function Contact() {
  const initialForm = {
    nombre: "",
    email: "",
    mensaje: "",
  };
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [contacto, setContacto] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSending(true);
    const response = await axios.post(process.env.REACT_APP_API_URL+'/api/contacto',formData);
    setSending(false);
    setMsg(response.data.message);
    if (response.data.error === false) {
      setFormData(initialForm);
    }
  };

  useEffect(() => {
    const cargarFoto = async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'/api/contactos');
      setContacto(response.data);
    };
    cargarFoto();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={5} md={5} sm={12}>
          <h2>Contact: </h2>
          <h5>{contacto.texto1}</h5>
          <Form className="mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                name="nombre"
                onChange={handleChange}
                type="text"
                value={formData.nombre}
                placeholder="Enter Name"
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
            </Row>

            <FloatingLabel
              className="mb-4"
              controlId="floatingTextarea"
              label="Comments"
            >
              <Form.Control
                name="mensaje"
                as="textarea"
                onChange={handleChange}
                value={formData.mensaje}
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
                href="https://wa.me/+5491123652203?text=I'm%20interested%20about%20a%20listing%20of%20properties"
                variant="outline-success"
              >
                <img
                  alt="Chat on WhatsApp"
                  src="WhatsAppButtonGreenLarge.png"
                />
                Chat on WhatsApp
              </Button>
            </Row>
            {sending ? 
            (<span>
              <Spinner animation="border" role="status" variant="info">
                <span className="visually-hidden">Sending...</span>
              </Spinner><h5> Sending...</h5></span>
            ): null}
            {msg ? <h5>{msg}</h5> : null}
          </Form>
        </Col>
        <Col lg={7} md={7} sm={12} className="d-flex flex-row-reverse">
          <Image src={contacto.imagen} rounded />
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
