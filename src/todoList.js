import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TodoItem from "./todoItem";

const TodoList = ({ titulo, items, handleCheckboxChange }) => {
  return (
    <>
      <div>
        <h2>{titulo}</h2>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#32a850" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>SKU</TableCell>
                <TableCell sx={{ color: "white" }}>Nombre Producto</TableCell>
                <TableCell sx={{ color: "white" }}>Precio Unitario</TableCell>
                <TableCell sx={{ color: "white" }}>Cantidad</TableCell>
                <TableCell sx={{ color: "white" }}>Total</TableCell>
                {handleCheckboxChange && (
                  <TableCell sx={{ color: "white" }}>Completado</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TodoItem
                  item={item}
                  handleCheckboxChange={handleCheckboxChange}
                  titulo={titulo}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default TodoList;
