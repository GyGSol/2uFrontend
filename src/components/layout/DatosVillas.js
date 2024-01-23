import {useState,useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ItemCasa from "./ItemCasa";
import Tabla from "./Tabla";

// nombre, dormitorios, linkpdf, linkvideo, linkimagen, banos, vista, area

const Datos = (props) => {
  const [casas,setCasas] = useState([]);

  useEffect( () =>{
    const cargarCasas = async () => {
      const response = await axios.get('http://localhost:3030/api/casas');
      setCasas(response.data);
    }
    cargarCasas();
  } ,[])

  return (
    <Container>
      <h2>Properties:</h2>
      {
        (casas.map(item => <ItemCasa key={item.id} nombre={item.nombre} 
          dormitorios={item.dormitorios}
          linkpdf={item.linkpdf} 
          linkvideo={item.linkvideo} 
          imagen={item.imagen} 
          banos={item.banos} 
          vista ={item.vista}
          area ={item.area}
          precios={item.precio.map(item => <Tabla key={item.idCasa} precio={item.precio} mes={item.mes}/>)}
          />)
        )
      } 
    </Container>
  );
};

export default Datos;