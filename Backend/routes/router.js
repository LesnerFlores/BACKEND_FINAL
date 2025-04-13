"use strict";

// ***************** RUTAS*******************
var RESERVASController = require("../controllers/Reservas-controller");
var VehiculoController = require("../controllers/vehiculo-controller");
var clienteController = require("../controllers/cliente-controller");

var express = require("express");
var router = express.Router();

router
  //RESERVAS 
  .get("/RESERVA/TodaslasReservas", RESERVASController.getAll)
  .post("/RESERVA/InsertarReserva", RESERVASController.post)
  .delete("/RESERVA/EliminarReserva", RESERVASController.delete)
  .post("/RESERVA/buscarporId", RESERVASController.getById)
  .put("/RESERVA/actualizarReserva", RESERVASController.update)

  //VEHÍCULOS
  .get("/vehiculo/TodoslosVehiculos", VehiculoController.getAll)
  .post("/vehiculo/InsertarVehiculo", VehiculoController.post)
  .delete("/vehiculo/EliminarVehiculo", VehiculoController.delete)
  .post("/vehiculo/buscarporId", VehiculoController.getById)
  .put("/vehiculo/actualizarVehiculo", VehiculoController.update)

  //VEHÍCULOS
  .get("/cliente/TodoslosClientes", clienteController.obtenerTodos)
  .post("/cliente/InsertarCliente", clienteController.crear)
  .delete("/cliente/EliminarCliente/:id", clienteController.eliminar)
  .get("/cliente/buscarporId/:id", clienteController.obtenerPorId)
  .put("/cliente/actualizarCliente/:id", clienteController.actualizar)

  //ERRORES
  .use((req, res) => {
    res.status(404).json({ error: "Ruta no implementada" });
  });

module.exports = router;