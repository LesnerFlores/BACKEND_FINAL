'use strict';

var conn = require("../config/db-connection"),
    RESERVASModel = () => {};

// Obtener todas las reservas
RESERVASModel.getAll = (cb) => 
    conn.query("SELECT * FROM Reservas", cb);

// Obtener una reserva por su ID
RESERVASModel.getById = (id, cb) => 
    conn.query("SELECT * FROM Reservas WHERE ID_Reserva = $1", [id], cb);

// Insertar una nueva reserva
RESERVASModel.post = (data, cb) => 
    conn.query(
      "INSERT INTO Reservas (ID_Reserva, ID_Cliente, ID_Vehiculo, Fecha_Inicio, Fecha_Fin, Estado, Precio_Total) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        data.ID_Reserva,
        data.ID_Cliente,
        data.ID_Vehiculo,
        data.Fecha_Inicio,
        data.Fecha_Fin,
        data.Estado,
        data.Precio_Total
      ],
      cb
    );

// Eliminar una reserva por su ID
RESERVASModel.delete = (id, cb) => 
    conn.query("DELETE FROM Reservas WHERE ID_Reserva = $1", [id], cb);

// Actualizar datos de una reserva
RESERVASModel.update = (data, cb) => 
    conn.query(
      `UPDATE Reservas SET 
        ID_Cliente = $1,
        ID_Vehiculo = $2,
        Fecha_Inicio = $3,
        Fecha_Fin = $4,
        Estado = $5,
        Precio_Total = $6
      WHERE ID_Reserva = $7`,
      [
        data.ID_Cliente,
        data.ID_Vehiculo,
        data.Fecha_Inicio,
        data.Fecha_Fin,
        data.Estado,
        data.Precio_Total,
        data.ID_Reserva
      ],
      cb
    );

module.exports = RESERVASModel;

  