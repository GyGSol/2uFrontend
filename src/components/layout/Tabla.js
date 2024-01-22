import React from "react";

const Tabla = (props) => {
  const {mes, precio} = props;
  return (
    <>
      <tr>
        <td>{mes}</td>
        <td>{precio} € / week</td>
      </tr>
    </>
  );
};

export default Tabla;