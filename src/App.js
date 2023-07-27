import React, { useState } from "react";
import { Button } from "@mui/material";
import Usuario from "./usuario";
import TodoList from "./todoList";

const App = () => {
  /* - Que reciba una lista de productos, cada item va a contener: sku, nombre de producto, precio unitario, cantidad, total. */
  const [itemsPendientes, setItemsPendientes] = useState([
    {
      sku: "123",
      nombreProducto: "Laptop",
      precio: 1000,
      cantidad: 3,
    },
    {
      sku: "456",
      nombreProducto: "Television",
      precio: 2000,
      cantidad: 2,
    },
    {
      sku: "789",
      nombreProducto: "Mesa",
      precio: 4000,
      cantidad: 6,
    },
  ]);

  const [itemsCompletados, setItemsCompletados] = useState([]);

  const handleCheckboxChange = (sku) => {
    const itemIndex = itemsPendientes.findIndex((item) => item.sku === sku);

    if (itemIndex !== -1) {
      const itemsActualizados = [...itemsPendientes];
      const itemCompletado = itemsActualizados.splice(itemIndex, 1)[0];
      itemCompletado.completado = true;
      setItemsPendientes(itemsActualizados);
      setItemsCompletados([...itemsCompletados, itemCompletado]);
    }
  };

  const handleBotonClick = () => {
    const todosCompletados = itemsPendientes.every((item) => item.completado);
    if (todosCompletados) {
      alert("Todo correcto");
      window.location.reload(
        true
      ); /* Para volver a cargar la pagina despues del alert */
    }
  };

  return (
    <div>
      <Usuario
        datosUsuario={{
          Nombre: "Jose Perez",
          Direccion: "Las Quintas",
          Telefono: "555-555-555",
        }}
        fecha="26/07/2023"
        numGuia="H-123456"
      />
      <TodoList
        titulo="Pendientes"
        items={itemsPendientes}
        handleCheckboxChange={handleCheckboxChange}
      />
      <TodoList titulo="Completadas" items={itemsCompletados} />

      {/* 
      - Al final agregar un botón que diga “Procesar”, 
        este solo estará habilitado si todos los elementos de la lista 1 se pasaron a la lista 2. 
        Al presionarlo debe mostrar “Todo correcto”. */}

      <Button
        sx={{ marginTop: "2rem" }}
        variant="outlined"
        onClick={handleBotonClick}
        disabled={itemsPendientes.some((item) => !item.completado)}
      >
        Procesar
      </Button>
    </div>
  );
};

export default App;
