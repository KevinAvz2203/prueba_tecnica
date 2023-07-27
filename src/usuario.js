import React from "react";
import { Box, Typography } from "@mui/material";

/*  
- En la pantalla, en la parte de arriba primero mostrar un panel con la información del usuario, 
  vendra: nombre de cliente, su dirección y su teléfono.
- En la misma parte superior, pero en la derecha, mostrar la fecha y un número de guía. 
*/

const Usuario = ({ datosUsuario, fecha, numGuia }) => {
  return (
    <div>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography>Nombre: {datosUsuario.Nombre}</Typography>
          <Typography>Direccion: {datosUsuario.Direccion}</Typography>
          <Typography>Telefono: {datosUsuario.Telefono}</Typography>
        </div>
        <div>
          <Typography>Fecha: {fecha}</Typography>
          <Typography>Número de Guía: {numGuia}</Typography>
        </div>
      </Box>
    </div>
  );
};

export default Usuario;
