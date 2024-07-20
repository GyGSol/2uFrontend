import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

//id, nombre, dormitorios, linkpdf, linkvideo, linkimagen, propietario, banos, vista

const casasItem = (props) => {
  const {
    nombre,
    dormitorios,
    linkpdf,
    linkvideo,
    imagen,
    banos,
    vista,
    area,
    precios,
    pax,
  } = props;

  return (
    <div className="mb-3" style={{ color: "purple" }}>
      <Row className="mb-2" >
        <Col lg={3} m={3} sm={12}>
          <h3>
            <Badge bg="info">{nombre}</Badge>
          </h3>
          <h4>{dormitorios} Bedrooms</h4>
          <h4>{pax} Guests</h4>
          <h5>Views: {vista}</h5>
          <p>{banos} Bathrooms</p>
          <div className="mb-2">
            <Button href={linkpdf} variant="outline-info">
              PDF
            </Button>
            {"  "}
            {linkvideo !== "" ? (
              <Button href={linkvideo} variant="outline-info">
                VIDEO
              </Button>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col lg={4} m={4} sm={12}>
          <Image src={imagen} alt="foto" rounded></Image>
          <h4 className="mt-2">Location : {area}</h4>
        </Col>
        <Col lg={5} m={5} sm={12}>
          <Table  style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th>Mounth</th>
                <th style={{ textAlign: "right" }}>Prices</th>
              </tr>
            </thead>
            <tbody>{precios}</tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default casasItem;
