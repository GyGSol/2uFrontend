import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

function PersonalItem(props) {
  const { nombre, descripcion, imagen } = props;
  
  return (
    <Col lg={3} md={3} sm={12}>
      <Card style={{ width: "12rem" }}>
        <Card.Img variant="top" src={imagen} fluid/>
        <Card.Body>
          <Card.Header>{nombre}</Card.Header>
          
          <Card.Text>{descripcion}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PersonalItem;
