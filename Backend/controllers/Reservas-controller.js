'use strict'

var RESERVASModel = require('../models/Reservas-model'),
    RESERVASController = () => {};

// Método para crear una nueva reserva (POST)
RESERVASController.post = (req, res, next) => {
    const { ID_Reserva, ID_Cliente, ID_Vehiculo, Fecha_Inicio, Fecha_Fin, Estado, Precio_Total } = req.body;

    // Validación de datos de entrada
    if (!ID_Reserva || !ID_Cliente || !ID_Vehiculo || !Fecha_Inicio || !Fecha_Fin || !Estado || !Precio_Total) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Crear un objeto con la reserva
    let Reservas = {
        ID_Reserva,
        ID_Cliente,
        ID_Vehiculo,
        Fecha_Inicio,
        Fecha_Fin,
        Estado,
        Precio_Total
    };

    // Llamada al modelo para insertar la reserva
    RESERVASModel.post(Reservas, (err) => {
        if (err) {
            return res.status(500).json({
                error: `Error al salvar la reserva con el ID: ${ID_Reserva}`,
                message: err.message
            });
        }
        res.status(201).json({ message: 'Reserva ingresada correctamente' });
    });
};

// Método para obtener todas las reservas (GET)
RESERVASController.getAll = (req, res, next) => {
    RESERVASModel.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({
                error: 'Error al consultar las reservas',
                message: err.message
            });
        }
        res.status(200).json(rows.rows);
    });
};

// Método para obtener una reserva por su ID (GET)
RESERVASController.getById = (req, res, next) => {
    const { ID_Reserva } = req.body;

    if (!ID_Reserva) {
        return res.status(400).json({ error: "El campo 'ID_Reserva' es requerido" });
    }

    RESERVASModel.getById(ID_Reserva, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } else {
            if (rows.rows.length === 0) {
                return res.status(404).json({ message: "No se encontró la reserva con el ID proporcionado" });
            }
            res.status(200).json(rows.rows[0]);
        }
    });
};

// Método para actualizar una reserva (PUT)
RESERVASController.update = (req, res, next) => {
    const { ID_Reserva, ID_Cliente, ID_Vehiculo, Fecha_Inicio, Fecha_Fin, Estado, Precio_Total } = req.body;

    if (!ID_Reserva || !ID_Cliente || !ID_Vehiculo || !Fecha_Inicio || !Fecha_Fin || !Estado || !Precio_Total) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    let Reservas = {
        ID_Reserva,
        ID_Cliente,
        ID_Vehiculo,
        Fecha_Inicio,
        Fecha_Fin,
        Estado,
        Precio_Total
    };

    RESERVASModel.update(Reservas, (err) => {
        if (err) {
            return res.status(520).json({
                error: `Error al actualizar la reserva con el ID: ${ID_Reserva}`,
                message: err.message
            });
        }
        res.status(200).json({ message: 'Reserva actualizada correctamente' });
    });
};

// Método para eliminar una reserva (DELETE)
RESERVASController.delete = (req, res, next) => {
    const { ID_Reserva } = req.body;

    if (!ID_Reserva) {
        return res.status(400).json({ error: "El campo 'ID_Reserva' es requerido" });
    }

    RESERVASModel.delete(ID_Reserva, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: `Error al eliminar la reserva con el ID: ${ID_Reserva}`, message: err.message });
        }
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    });
};

// Método para manejar errores 404
RESERVASController.error404 = (req, res, next) => {
    let error = new Error(),
        locals = {
            title: 'Error 404',
            description: 'Recurso No Encontrado',
            error: error
        };

    error.status = 404;

    res.status(404).json(locals);

    next();
};

module.exports = RESERVASController;