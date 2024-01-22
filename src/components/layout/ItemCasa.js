import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

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
  } = props;

  return (
    <div className="mb-4">
      <Row>
        <Col>
          <h2><Badge bg="dark">{nombre}</Badge></h2>
          <h4>Location : {area}</h4>
          <h4>{dormitorios} Bedrooms</h4>
          <h4>{banos} Bathrooms</h4>
          <h5>Views: {vista}</h5>
          <div className="mb-2">
            <Button href={linkpdf} variant="outline-info">PDF</Button>{'  '}
            <Button href={linkvideo} variant="outline-info">VIDEO</Button>
          </div>
        </Col>
        <Col m={12} className="d-flex flex-row-reverse">
          <Image src={imagen} alt="foto" rounded></Image>
        </Col>
      </Row>
      <Row>
        <Table className="mt-2">
          <thead>
            <tr>
              <th>Mounth</th>
              <th>Prices</th>
            </tr>
          </thead>
          <tbody>{precios}</tbody>
        </Table>
      </Row>
    </div>
  );
};

export default casasItem;
