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
import Spinner from "react-bootstrap/Spinner";

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

  const [mostrar, setMostrar] = useState(false);
  const [areas, setAreas] = useState([]);
  const [vistas, setVistas] = useState([]);
  const [busqueda, setBusqueda] = useState([]);
  const [msg, setMsg] = useState("");
  const [formData, setFormData] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const formulario = useRef(null);
  let res = null;

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    let response = await axios.get(
      process.env.REACT_APP_API_URL + "/api/casas"
    );
    res = response.data;
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
      process.env.REACT_APP_API_URL + "/api/searchFrom",
      formData
    );
    console.log(responseSerchFrom.data.message);

    if (res.length > 0) {
      setMostrar(true);
      setSending(false);
    } else {
      setMostrar(false);
      setSending(false);
    }
    setBusqueda(res);
  };

  const SendSubmit = async (e) => {
    setMsg("");
    setSendingEmail(true);
    const responseSerch = await axios.post(
      process.env.REACT_APP_API_URL + "/api/search",
      busqueda
    );
    setMsg(responseSerch.data.message);
    setSendingEmail(false);
  };

  useEffect(() => {
    const cargarAreas = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/areas"
      );
      setAreas(response.data);
    };
    cargarAreas();
  }, []);

  useEffect(() => {
    const cargarVistas = async () => {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/api/vistas"
      );
      setVistas(response.data);
    };
    cargarVistas();
  }, []);

  return (
    <Container className="mt-2">
      <h3>Property Search</h3>
      <Form onSubmit={handleSubmit} ref={formulario}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Client Name</Form.Label>
            <Form.Control
              required
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
              required
              name="fechaDesde"
              type="date"
              onChange={handleChange}
              value={formData.fechaDesde}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDeparture">
            <Form.Label>Departure day</Form.Label>
            <Form.Control
              required
              name="fechaHasta"
              value={formData.fechaHasta}
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              name="dormitorios"
              value={formData.dormitorios}
              type="number"
              placeholder="Enter number of bedrooms"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridArea">
            <Form.Label>Areas</Form.Label>
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
              required
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
              required
              name="email"
              value={formData.email}
              type="email"
              placeholder="Enter your Email"
              onChange={handleChange}
            />
          </Form.Group>
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
        <Button variant="info" type="submit" size="lg">
          Search Properties
          {sending ? (
            <div>
              <Spinner animation="border" role="status" variant="warning" />
              <span className="visually-hidden">Searching...</span>
            </div>
          ) : null}
        </Button>
      </Form>
      <div className="mt-3">
        {mostrar ? (
          <div>
            <h2 className="mb-2">
              Searched properties:{" "}
              {mostrar ? (
                <Button
                  variant="outline-warning"
                  onClick={SendSubmit}
                  size="lg"
                >
                  <Row><div>Send Email</div>
                  {sendingEmail ? (
                    <div>
                      <Spinner
                        animation="border"
                        role="status"
                        variant="info"
                      />
                      <span className="visually-hidden">Sending...</span>
                    </div>
                  ) : null}</Row>
                </Button>
              ) : null}
              {msg ? <h5>{msg}</h5> : null}
            </h2>
          </div>
        ) : null}
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
          <h4>No properties searched...</h4>
        )}
      </div>
    </Container>
  );
}

export default Questionnaire;
