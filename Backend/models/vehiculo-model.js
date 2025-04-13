"use strict";

var conn = require("../config/db-connection"),
  VehiculoModel = () => {};

// Método para obtener todos los vehículos
VehiculoModel.getAll = (cb) => conn.query("SELECT * FROM vehiculo", cb);

// Método para insertar un nuevo vehículo
VehiculoModel.post = (data, cb) =>
  conn.query(
    "INSERT INTO public.vehiculo(id_vehiculo, marca, modelo, anio, fecha_matricula, numero_placa, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      data.id_vehiculo,
      data.marca,
      data.modelo,
      data.anio,
      data.fecha_matricula,
      data.numero_placa,
      data.estado,
    ],
    cb
  );

// Método para eliminar un vehículo por su ID
VehiculoModel.delete = (id, cb) =>
  conn.query("DELETE FROM public.vehiculo WHERE id_vehiculo = $1", [id], cb);

// Método para obtener un vehículo por su ID
VehiculoModel.getById = (id, cb) => {
  conn.query("SELECT * FROM vehiculo WHERE id_vehiculo = $1", [id], cb);
};

// Método para actualizar los datos de un vehículo
VehiculoModel.update = (vehiculo, callback) => {
  let sql = `
      UPDATE vehiculo SET
      marca = $1,
      modelo = $2,
      anio = $3,
      fecha_matricula = $4,
      numero_placa = $5,
      estado = $6
      WHERE id_vehiculo = $7
  `;

  return conn.query(sql, [
    vehiculo.marca,
    vehiculo.modelo,
    vehiculo.anio,
    vehiculo.fecha_matricula,
    vehiculo.numero_placa,
    vehiculo.estado,
    vehiculo.id_vehiculo,
  ], callback);
};

module.exports = VehiculoModel;