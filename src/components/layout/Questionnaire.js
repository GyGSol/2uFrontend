import { useState, useEffect, useRef } from "react";

import React from "react";
import axios from "axios";
import ItemCasa from "./ItemCasa";
import Tabla from "./Tabla";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Questionnaire() {
  const initialForm = {
    area: "",
    dormitorios: "",
    especial: "",
    fechaDesde: "",
    fechaHasta: "",
    importe: "",
    nacionalidad: "",
    nombreCliente: "",
    email: "",
    pax: "",
    vista: "",
  };
  const [loading, setLoading] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [areas, setAreas] = useState([]);
  const [vistas, setVistas] = useState([]);
  const [busqueda, setBusqueda] = useState([]);

  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const formulario = useRef(null);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMostrar(true);
    let response = await axios.get(process.env.REACT_APP_API_URL+'/api/casas');
    let res = response.data;
    let parametros = formData;

    console.log("parametros", parametros);
    if (parametros.vista !== "") {
      res = res.filter((item) => item.vista === parametros.vista);
    }
    if (parametros.area !== "") {
      res = res.filter((item) => item.area === parametros.area);
    }
    if (parametros.dormitorios !== "") {
      res = res.filter(
        (item) => item.dormitorios >= Number(parametros.dormitorios)
      );
    }
    if (parametros.pax !== "") {
      res = res.filter((item) => item.pax >= Number(parametros.pax));
    }
    const responseSerchFrom = await axios.post(
      process.env.REACT_APP_API_URL+'/api/searchFrom',
      formData
    );
    const responseSerch = await axios.post(
      process.env.REACT_APP_API_URL+'/api/search',
      res
    );
    console.log("formData fil", responseSerchFrom);
    setSending(false);
    setMsg(responseSerch.data.message);
    setBusqueda(res);
  };

  useEffect(() => {
    const cargarAreas = async () => {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_API_URL+'/api/areas');
      setAreas(response.data);
      setLoading(false);
    };
    cargarAreas();
  }, []);

  useEffect(() => {
    const cargarVistas = async () => {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_API_URL+'/api/vistas');
      setVistas(response.data);
      setLoading(false);
    };
    cargarVistas();
  }, []);

  useEffect(() => {
    const cargarBusqueda = async () => {
      setLoading(true);

      setLoading(false);
    };
    cargarBusqueda();
  }, []);
  return (
    <Container className="mt-2">
      <h3>Property Search</h3>
      <Form onSubmit={handleSubmit} ref={formulario}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              name="nombreCliente"
              value={formData.nombreCliente}
              onChange={handleChange}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridArrival">
            <Form.Label>Arrival day</Form.Label>
            <Form.Control
              name="fechaDesde"
              type="date"
              onChange={handleChange}
              value={formData.fechaDesde}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDeparture">
            <Form.Label>Departure day</Form.Label>
            <Form.Control
              name="fechaHasta"
              value={formData.fechaHasta}
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Bedroom number</Form.Label>
            <Form.Control
              name="dormitorios"
              value={formData.dormitorios}
              type="number"
              placeholder="Enter number of bedrooms"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridArea">
            <Form.Label>Area of preference</Form.Label>
            <Form.Select
              name="area"
              defaultValue="Choose..."
              onChange={handleChange}
            >
              <option>Choose...</option>
              {areas.map((area, index) => {
                return (
                  <option key={index} value={area.area}>
                    {area.area}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridView">
            <Form.Label>View</Form.Label>
            <Form.Select
              name="vista"
              defaultValue="Choose..."
              onChange={handleChange}
            >
              <option>Choose...</option>
              {vistas.map((vista, index) => {
                return (
                  <option key={index} value={vista.vista}>
                    {vista.vista}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGuests">
            <Form.Label>Guests</Form.Label>
            <Form.Control
              name="pax"
              value={formData.pax}
              type="number"
              placeholder="Enter number of guests (man-woman-kids)"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              type="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridBudget">
            <Form.Label>Approximate budget / Week</Form.Label>
            <Form.Control
              name="importe"
              value={formData.importe}
              type="text"
              placeholder="Enter Approximate budget in euros"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridSpecialRequests">
          <Form.Label>Special requests</Form.Label>
          <Form.Control
            name="especial"
            value={formData.especial}
            type="text-area"
            placeholder="Enter your special requests"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Search and Send
        </Button>
      </Form>
      <div className="mt-3">
        {mostrar ? (
          <div>
            <h2 className="mb-2">Searched properties: </h2>
          </div>
        ) : (
          ""
        )}
        {mostrar ? (
          busqueda.map((item, index) => (
            <ItemCasa
              key={index}
              nombre={item.nombre}
              dormitorios={item.dormitorios}
              linkpdf={item.linkpdf}
              linkvideo={item.linkvideo}
              imagen={item.imagen}
              banos={item.banos}
              pax={item.pax}
              vista={item.vista}
              area={item.area}
              precios={item.precio.map((item, index) => (
                <Tabla key={index} precio={item.precio} mes={item.mes} />
              ))}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </Container>
  );
}

export default Questionnaire;
