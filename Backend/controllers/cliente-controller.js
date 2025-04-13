const clienteModel = require('../models/cliente-model');

const clienteController = {
    
  obtenerTodos: async (req, res) => {
    try {
      const clientes = await clienteModel.obtenerTodos();
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      res.status(500).json({ 
        error: 'Error al obtener los clientes',
        details: error.message 
      });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const cliente = await clienteModel.obtenerPorId(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json(cliente);
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      res.status(500).json({ 
        error: 'Error al obtener el cliente',
        details: error.message 
      });
    }
  },

  crear: async (req, res) => {
    try {
      const nuevoCliente = await clienteModel.crear(req.body);
      res.status(201).json(nuevoCliente);
    } catch (error) {
      console.error('Error en crear:', error);
      res.status(500).json({ 
        error: 'Error al crear el cliente',
        details: error.message 
      });
    }
  },

  actualizar: async (req, res) => {
    try {
      const clienteActualizado = await clienteModel.actualizar(
        req.params.id, 
        req.body
      );
      if (!clienteActualizado) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json(clienteActualizado);
    } catch (error) {
      console.error('Error en actualizar:', error);
      res.status(500).json({ 
        error: 'Error al actualizar el cliente',
        details: error.message 
      });
    }
  },

  eliminar: async (req, res) => {
    try {
      const clienteEliminado = await clienteModel.eliminar(req.params.id);
      if (!clienteEliminado) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json(clienteEliminado);
    } catch (error) {
      console.error('Error en eliminar:', error);
      res.status(500).json({ 
        error: 'Error al eliminar el cliente',
        details: error.message 
      });
    }
  }
};




module.exports = clienteController;