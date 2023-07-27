import React from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";

/* 
- Después desglosar la lista debajo con el título: pendientes, con los items, a modo como si fuera una factura, con todas las columnas, y que al final de cada línea tenga un checkbox, al presionar en el checkboz, debe desaparecer de esta lista y enviarse a una lista más abajo.
- En la segunda lista de abajo, ponerle título “Completadas”. Los elementos de la segunda lista NO lleva checkbox. 
*/

const TodoItem = ({ item, handleCheckboxChange, titulo }) => {
  return (
    <>
      <TableRow sx={{ backgroundColor: "#d0d6c5" }}>
        <TableCell>{item.sku}</TableCell>
        <TableCell>{item.nombreProducto}</TableCell>
        <TableCell>${item.precio}</TableCell>
        <TableCell>{item.cantidad}</TableCell>
        <TableCell>${item.cantidad * item.precio}</TableCell>
        {titulo === "Pendientes" && (
          <TableCell>
            <Checkbox
              checked={item.completado}
              onChange={() => handleCheckboxChange(item.sku)}
            />
          </TableCell>
        )}
      </TableRow>
    </>
  );
};

export default TodoItem;
