import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ItemCasa from "./ItemCasa";
import Tabla from "./Tabla";
import Spinner from "react-bootstrap/Spinner";

// nombre, dormitorios, linkpdf, linkvideo, linkimagen, banos, vista, area

const Datos = (props) => {
  const [casas, setCasas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCasas = async () => {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_API_URL+"/api/casas");
      setCasas(response.data);
      setLoading(false);
    };
    cargarCasas();
  }, []);

  return (
    <Container>
      <h2>Properties:</h2>
      {loading ? (
        <Spinner animation="border" role="status" variant="info">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        casas.map((item, index) => (
          <ItemCasa 
            key={index}
            nombre={item.nombre}
            dormitorios={item.dormitorios}
            linkpdf={item.linkpdf}
            linkvideo={item.linkvideo}
            imagen={item.imagen}
            pax={item.pax}
            banos={item.banos}
            vista={item.vista}
            area={item.area}
            precios={item.precio.map((item, index) => (
              <Tabla key={index} precio={item.precio} mes={item.mes} />
            ))}
          />
        ))
      )}
    </Container>
  );
};

export default Datos;
