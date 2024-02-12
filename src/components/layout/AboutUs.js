import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ItemPersonal from "./ItemPersonal";

const AboutUs = (props) => {
  const [nosotros, setNosotros] = useState({});
  const [personal, setPersonal] = useState([]);
  console.log("process",process.env.REACT_APP_API_URL);
  useEffect(() => {
    const cargarTextos = async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'/api/nosotros');
      setNosotros(response.data);
    };
    cargarTextos();
  }, []);
  
  useEffect(() => {
    const cargarPersonal = async () => {
      const response = await axios.get(process.env.REACT_APP_API_URL+'/api/personal');
      setPersonal(response.data);
    };
    cargarPersonal();
  }, []);
  
  return (
    <Container>
      <Row>
        <Col lg={8} md={8} sm={12}>
          <h4 className="mbr-section-title mbr-fonts-style mb-3 display-2">
            <strong>About us</strong>
          </h4>
          <p className="mbr-text mbr-fonts-style mb-3 display-7">
            {nosotros.texto1}
          </p>
          <p className="mbr-text mbr-fonts-style mb-3 display-7">
            {nosotros.texto2}
          </p>
          <p className="mbr-text mbr-fonts-style display-7">
            {nosotros.texto3}
          </p>
          <Row className="mt-3">
            <h4>Staff</h4>
            { personal.map((item, index) => (
              <ItemPersonal
                key={index}
                nombre={item.nombre}
                descripcion={item.descripcion}
                imagen={item.imagen}
              />
            ))
            }
          </Row>
        </Col>
        <Col lg={4} md={4} sm={12}>
          <div className="d-flex flex-row-reverse">
            <Image src={nosotros.imagen} rounded></Image>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
