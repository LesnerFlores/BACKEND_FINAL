'use strict';

var VehiculoModel = require('../models/vehiculo-model'),
    VehiculoController = () => {};

// Obtener todos los vehículos
// Obtener todos los vehículos
VehiculoController.getAll = (req, res, next) => {
    VehiculoModel.getAll((err, rows) => {
        if (err) {
            let locals = {
                title: 'Error al consultar la base de datos',
                description: 'Error de Sintaxis SQL',
                error: err
            };
            res.render('error', locals);
        } else {
            res.status(200).send(rows.rows);
        }
    });
};

// Insertar un nuevo vehículo
VehiculoController.post = (req, res, next) => {
    let vehiculo = {
        id_vehiculo: req.body.id_vehiculo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        anio: req.body.anio,
        fecha_matricula: req.body.fecha_matricula,
        numero_placa: req.body.numero_placa,
        estado: req.body.estado
    };

    VehiculoModel.post(vehiculo, (err) => {
        if (err) {
            let locals = {
                title: `Error al guardar el vehículo con el id: ${vehiculo.id_vehiculo}`,
                description: "Error de Sintaxis SQL",
                error: err
            };
            res.status(520).json(err);
        } else {
            res.send('Vehículo ingresado correctamente');
        }
    });
};

// Eliminar un vehículo por su ID
VehiculoController.delete = (req, res, next) => {
    let id_vehiculo = req.body.id_vehiculo;

    VehiculoModel.delete(id_vehiculo, (err, rows) => {
        if (err) {
            let locals = {
                title: `Error al eliminar el vehículo con el id: ${id_vehiculo}`,
                description: "Error de Sintaxis SQL",
                error: err
            };
            res.render('error', locals);
        } else {
            res.send('Vehículo eliminado correctamente');
        }
    });
};

// Obtener un vehículo por su ID
VehiculoController.getById = (req, res, next) => {
    const { id_vehiculo } = req.body;

    if (!id_vehiculo) {
        return res.status(400).json({ error: "El campo 'id_vehiculo' es requerido" });
    }

    VehiculoModel.getById(id_vehiculo, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (rows.rows.length === 0) {
                res.status(404).json({ message: "No se encontró el vehículo con el ID proporcionado" });
            } else {
                res.status(200).send(rows.rows[0]);
            }
        }
    });
};

// Actualizar un vehículo por su ID
VehiculoController.update = (req, res, next) => {
    let vehiculo = {
        id_vehiculo: req.body.id_vehiculo,
        marca: req.body.marca,
        modelo: req.body.modelo,
        anio: req.body.anio,
        fecha_matricula: req.body.fecha_matricula,
        numero_placa: req.body.numero_placa,
        estado: req.body.estado
    };

    VehiculoModel.update(vehiculo, (err) => {
        if (err) {
            let locals = {
                title: `Error al actualizar el vehículo con el id: ${vehiculo.id_vehiculo}`,
                description: "Error de Sintaxis SQL",
                error: err
            };
            res.status(520).json(err);
        } else {
            res.send('Vehículo actualizado correctamente');
        }
    });
};

// Métodos adicionales (dejar tal cual)
VehiculoController.addForm = (req, res, next) => 
    res.render('add-vehiculo', { title: 'Agregar Vehículo' });

VehiculoController.error404 = (req, res, next) => {
    let error = new Error(),
        locals = {
            title: 'Error 404',
            description: 'Recurso No Encontrado',
            error: error
        };

    error.status = 404;
    res.render('error', locals);
    next();
};

module.exports = VehiculoController;