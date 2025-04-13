"use strict";

var conn = require("../config/db-connection"),
  UsuarioModel = () => {};

// Método para obtener todos los usuarios
UsuarioModel.getAll = (cb) => conn.query("SELECT * FROM entidad_usuario", cb);

// Método para insertar un nuevo usuario
UsuarioModel.post = (data, cb) =>
  conn.query(
    "INSERT INTO entidad_usuario(codigo_usuario, nombre, apellido, password, email, estado, ultima_fecha, hora_ingreso, password_expira, dias_caducidad_password, rol_usuario, numero_intentos, fecha_registro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
    [
      data.codigo_usuario,
      data.nombre,
      data.apellido,
      data.password,
      data.email,
      data.estado,
      data.ultima_fecha,
      data.hora_ingreso,
      data.password_expira,
      data.dias_caducidad_password,
      data.rol_usuario,
      data.numero_intentos,
      data.fecha_registro
    ],
    cb
  );

// Método para eliminar un usuario por su ID
UsuarioModel.delete = (id, cb) =>
  conn.query("DELETE FROM entidad_usuario WHERE codigo_usuario = $1", [id], cb);

// Método para obtener un usuario por su ID
UsuarioModel.getById = (id, cb) => {
  conn.query("SELECT * FROM entidad_usuario WHERE codigo_usuario = $1", [id], cb);
};

// Método para obtener un usuario por su email
UsuarioModel.getByEmail = (email, cb) => {
  conn.query("SELECT * FROM entidad_usuario WHERE email = $1", [email], cb);
};

// Método para actualizar los datos de un usuario
UsuarioModel.update = (usuario, callback) => {
  let sql = `
      UPDATE entidad_usuario SET
      nombre = $1,
      apellido = $2,
      password = $3,
      email = $4,
      estado = $5,
      ultima_fecha = $6,
      hora_ingreso = $7,
      password_expira = $8,
      dias_caducidad_password = $9,
      rol_usuario = $10,
      numero_intentos = $11
      WHERE codigo_usuario = $12
  `;

  return conn.query(sql, [
    usuario.nombre,
    usuario.apellido,
    usuario.password,
    usuario.email,
    usuario.estado,
    usuario.ultima_fecha,
    usuario.hora_ingreso,
    usuario.password_expira,
    usuario.dias_caducidad_password,
    usuario.rol_usuario,
    usuario.numero_intentos,
    usuario.codigo_usuario
  ], callback);
};

// Método para actualizar el estado de un usuario
UsuarioModel.updateStatus = (id, estado, callback) => {
  return conn.query(
    "UPDATE entidad_usuario SET estado = $1 WHERE codigo_usuario = $2",
    [estado, id],
    callback
  );
};

module.exports = UsuarioModel;