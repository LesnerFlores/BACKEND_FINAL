'use strict';

var UsuarioModel = require('../models/usuario_model'),
    UsuarioController = () => {};

// Obtener todos los usuarios
UsuarioController.getAll = (req, res, next) => {
    UsuarioModel.getAll((err, rows) => {
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

// Insertar un nuevo usuario (con validación de email)
UsuarioController.post = (req, res, next) => {
    // Primero verificamos si el email ya existe
    UsuarioModel.getByEmail(req.body.email, (err, rows) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Error al verificar el email',
                details: err.message 
            });
        }

        if (rows.rows.length > 0) {
            return res.status(400).json({ 
                error: 'El email ya está registrado',
                message: 'Por favor use otro email' 
            });
        }

        // Si el email no existe, procedemos con la creación
        let usuario = {
            codigo_usuario: req.body.codigo_usuario,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            password: req.body.password,
            email: req.body.email,
            estado: req.body.estado,
            ultima_fecha: req.body.ultima_fecha,
            hora_ingreso: req.body.hora_ingreso,
            password_expira: req.body.password_expira,
            dias_caducidad_password: req.body.dias_caducidad_password,
            rol_usuario: req.body.rol_usuario,
            numero_intentos: req.body.numero_intentos,
            fecha_registro: req.body.fecha_registro
        };

        UsuarioModel.post(usuario, (err) => {
            if (err) {
                let locals = {
                    title: `Error al guardar el usuario con el código: ${usuario.codigo_usuario}`,
                    description: "Error de Sintaxis SQL",
                    error: err
                };
                res.status(520).json(err);
            } else {
                res.status(201).json({
                    success: true,
                    message: 'Usuario registrado correctamente'
                });
            }
        });
    });
};

// Eliminar un usuario por su ID
UsuarioController.delete = (req, res, next) => {
    let codigo_usuario = req.body.codigo_usuario;

    UsuarioModel.delete(codigo_usuario, (err, rows) => {
        if (err) {
            let locals = {
                title: `Error al eliminar el usuario con el código: ${codigo_usuario}`,
                description: "Error de Sintaxis SQL",
                error: err
            };
            res.render('error', locals);
        } else {
            res.send('Usuario eliminado correctamente');
        }
    });
};

// Obtener un usuario por su ID
UsuarioController.getById = (req, res, next) => {
    const { codigo_usuario } = req.body;

    if (!codigo_usuario) {
        return res.status(400).json({ error: "El campo 'codigo_usuario' es requerido" });
    }

    UsuarioModel.getById(codigo_usuario, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (rows.rows.length === 0) {
                res.status(404).json({ message: "No se encontró el usuario con el código proporcionado" });
            } else {
                res.status(200).send(rows.rows[0]);
            }
        }
    });
};

// Obtener un usuario por su email
UsuarioController.getByEmail = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "El campo 'email' es requerido" });
    }

    UsuarioModel.getByEmail(email, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            if (rows.rows.length === 0) {
                res.status(404).json({ message: "No se encontró el usuario con el email proporcionado" });
            } else {
                res.status(200).send(rows.rows[0]);
            }
        }
    });
};

// Actualizar un usuario por su ID (con validación de email)
UsuarioController.update = (req, res, next) => {
    let usuario = {
        codigo_usuario: req.body.codigo_usuario,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        password: req.body.password,
        email: req.body.email,
        estado: req.body.estado,
        ultima_fecha: req.body.ultima_fecha,
        hora_ingreso: req.body.hora_ingreso,
        password_expira: req.body.password_expira,
        dias_caducidad_password: req.body.dias_caducidad_password,
        rol_usuario: req.body.rol_usuario,
        numero_intentos: req.body.numero_intentos
    };

    // Primero obtenemos el usuario actual para comparar emails
    UsuarioModel.getById(usuario.codigo_usuario, (err, currentUser) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (currentUser.rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const currentEmail = currentUser.rows[0].email;
        
        // Solo validamos si el email ha cambiado
        if (usuario.email !== currentEmail) {
            UsuarioModel.getByEmail(usuario.email, (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (rows.rows.length > 0) {
                    return res.status(400).json({ 
                        error: "El nuevo email ya está registrado",
                        message: "Por favor use otro email" 
                    });
                }

                // Si el email no existe, procedemos con la actualización
                proceedWithUpdate();
            });
        } else {
            // Si el email no ha cambiado, actualizamos directamente
            proceedWithUpdate();
        }
    });

    function proceedWithUpdate() {
        UsuarioModel.update(usuario, (err) => {
            if (err) {
                let locals = {
                    title: `Error al actualizar el usuario con el código: ${usuario.codigo_usuario}`,
                    description: "Error de Sintaxis SQL",
                    error: err
                };
                res.status(520).json(err);
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Usuario actualizado correctamente'
                });
            }
        });
    }
};

// Actualizar estado de usuario
UsuarioController.updateStatus = (req, res, next) => {
    let codigo_usuario = req.body.codigo_usuario;
    let estado = req.body.estado;

    UsuarioModel.updateStatus(codigo_usuario, estado, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.send('Estado de usuario actualizado correctamente');
        }
    });
};

// Métodos adicionales (dejar tal cual)
UsuarioController.addForm = (req, res, next) => 
    res.render('add-usuario', { title: 'Agregar Usuario' });

UsuarioController.error404 = (req, res, next) => {
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

module.exports = UsuarioController;