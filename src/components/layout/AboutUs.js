import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const AboutUs = (props) => {
  const [nosotros, setNosotros] = useState({});

  useEffect(() => {
    const cargarTextos = async () => {
      const response = await axios.get("http://localhost:3030/api/nosotros");
      setNosotros(response.data);
    };
    cargarTextos();
  }, []);
  
  return (
    <Container>
      <Row>
        <Col lg={7} md={7}>
          <h2 className="mbr-section-title mbr-fonts-style mb-3 display-2">
            <strong>About us</strong>
          </h2>
          <p className="mbr-text mbr-fonts-style mb-3 display-7">
            {nosotros.texto1}
          </p>
          <p className="mbr-text mbr-fonts-style mb-3 display-7">
            {nosotros.texto2}
          </p>
          <p className="mbr-text mbr-fonts-style display-7">
            {nosotros.texto3}
          </p>
        </Col>
        <Col lg={5} md={5}>
          <div className="d-flex flex-row-reverse">
            <Image src={nosotros.imagen} rounded></Image>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
