import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Questionnaire() {
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);
  const [vistas, setVistas] = useState([]);
  const [paises, setPaises] = useState([]);

  const formulario = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = new FormData(formulario.current);
    console.log(Object.fromEntries([...datos.entries()]));
  };

  useEffect(() => {
    const cargarAreas = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/api/areas");
      setAreas(response.data);
      setLoading(false);
    };
    cargarAreas();
  }, []);

  useEffect(() => {
    const cargarVistas = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/api/vistas");
      setVistas(response.data);
      setLoading(false);
    };
    cargarVistas();
  }, []);

  useEffect(() => {
    const cargarPaises = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3030/api/paises");
      setPaises(response.data);
      setLoading(false);
    };
    cargarPaises();
  }, []);
  return (
    <Container className="mt-5">
      <h3>Property Search</h3>
      <Form action="/properties" onSubmit={handleSubmit} ref={formulario}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="nombreCliente"
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridArrival">
            <Form.Label>Arrival day</Form.Label>
            <Form.Control name="fechaDesde" type="date" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDeparture">
            <Form.Label>Departure day</Form.Label>
            <Form.Control name="fechaHasta" type="date" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Bedroom number</Form.Label>
            <Form.Control
              name="banos"
              type="number"
              placeholder="Enter number of bedrooms"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridArea">
            <Form.Label>Area of preference</Form.Label>
            <Form.Select name="area" defaultValue="Choose...">
              <option>Choose...</option>
              {areas.map((area) => {
                return (
                  <option key={area.id} value={area.id}>
                    {area.area}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridView">
            <Form.Label>View</Form.Label>
            <Form.Select name="vista" defaultValue="Choose...">
              <option>Choose...</option>
              {vistas.map((vista) => {
                return (
                  <option key={vista.id} value={vista.id}>
                    {vista.vista}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridGuests">
            <Form.Label>Guests</Form.Label>
            <Form.Control
              name="personas"
              type="number"
              placeholder="Enter number of guests (man-woman-kids)"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBudget">
            <Form.Label>Approximate budget</Form.Label>
            <Form.Control
              name="importe"
              type="number"
              placeholder="Enter Approximate budget in euros"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridNationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Select name="nacionalidad" defaultValue="Choose...">
              <option>Choose...</option>
              {paises.map((pais) => {
                return (
                  <option key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridSpecialRequests">
          <Form.Label>Special requests</Form.Label>
          <Form.Control
            name="especial"
            type="text-area"
            placeholder="Enter your special requests"
          />
        </Form.Group>

        <Button variant="info" type="submit">
          Send Search
        </Button>
      </Form>
    </Container>
  );
}

export default Questionnaire;
