const pool = require('../config/db-connection');

const clienteModel = {
  obtenerTodos: async () => {
    try {
      const query = 'SELECT "ID_CLIENTE", nombre, apellidos, fecha_nacimiento, genero, direccion, telefono FROM public."CLIENTE"';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  },

  obtenerPorId: async (id) => {
    try {
      const query = 'SELECT "ID_CLIENTE", nombre, apellidos, fecha_nacimiento, genero, direccion, telefono FROM public."CLIENTE" WHERE "ID_CLIENTE" = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  },

  crear: async (clienteData) => {
    try {
      const { ID_CLIENTE, nombre, apellidos, fecha_nacimiento, genero, direccion, telefono } = clienteData;
      const query = `
        INSERT INTO public."CLIENTE" 
        ("ID_CLIENTE", nombre, apellidos, fecha_nacimiento, genero, direccion, telefono)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const result = await pool.query(query, [
        ID_CLIENTE, 
        nombre, 
        apellidos, 
        fecha_nacimiento, 
        genero, 
        direccion || null, 
        telefono || null
      ]);
      return result.rows[0];
    } catch (error) {
      console.error('Error en crear:', error);
      throw error;
    }
  },

  actualizar: async (id, clienteData) => {
    try {
      const { nombre, apellidos, fecha_nacimiento, genero, direccion, telefono } = clienteData;
      const query = `
        UPDATE public."CLIENTE"
        SET nombre = $1, 
            apellidos = $2, 
            fecha_nacimiento = $3, 
            genero = $4, 
            direccion = $5, 
            telefono = $6
        WHERE "ID_CLIENTE" = $7
        RETURNING *;
      `;
      const result = await pool.query(query, [
        nombre, 
        apellidos, 
        fecha_nacimiento, 
        genero, 
        direccion || null, 
        telefono || null, 
        id
      ]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error en actualizar:', error);
      throw error;
    }
  },

  eliminar: async (id) => {
    try {
      const query = `
        DELETE FROM public."CLIENTE"
        WHERE "ID_CLIENTE" = $1
        RETURNING *;
      `;
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error en eliminar:', error);
      throw error;
    }
  }
};

module.exports = clienteModel;