const db = require("../models");
const tokenfunc = require('../helpers/token.helpers.js');
const jwt = require('jsonwebtoken');
const key = require('../config/const.js').JWT_SECRET;
const bcrypt = require('bcrypt');                       //    TO-DO: Implementar.

const loginSupervisor = async (req,res,next) => {
	
	try{

		const { correoSupervisor , password} = req.body;

		const supervisor = await db.supervisor.findOne({where:{correoSupervisor:correoSupervisor}});

		if (!supervisor) {
			return res.status(404).json({ message: "Credenciales incorrectas (No existe)." });
		}

		const passwordCorrecto = supervisor.password === password;

		if (passwordCorrecto) {
			const token = await tokenfunc.generateTokenSup(supervisor);
			return res.status(200).json({
				message: "Usuario validado exitosamente.",
				token: token
			});
		} else {
			return res.status(404).json({ message: "Credenciales incorrectas (Contraseña incorrecta)." });
		};
	}
	catch (error) {
		return res.status(500).json({ message: "Error interno del servidor.", error: error});
	};

};
const AllSolicitudes = async (req, res, next) => {
	try {
		const { token } = req.body;
		const decoded = jwt.verify(token, key);
		const solicitudes = await db.solicitud.findAll({
			where: {
				correoSupervisor: decoded.correoSupervisor,
				fase: {
					[db.Sequelize.Op.gt]: 3
				}
			},
			attributes: {
				include: [
					[
						db.Sequelize.fn('CONCAT', db.Sequelize.col('usuario.nombre1'), ' ', db.Sequelize.col('usuario.apellido1')),
						'nombre'
					]
				]
			},
			include: [
				{
					model: db.usuario,
					attributes: [], // Excluye todos los atributos del objeto usuario
				}
			],
			raw: true // Retorna los resultados planos sin estructuras adicionales
		});

		res.status(200).json(solicitudes);
	} catch (error) {
		res.status(500).json({ message: "Error interno del servidor.", error: error });
	}
};

const crearSupervisor = async (req,res,next) => {
	
	const {correoSupervisor, rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo } = req.body;

	try {
		// Permitir datos null? 
		const supervisor = await db.supervisor.create({
			correoSupervisor: correoSupervisor,
			rutEmpresa: rutEmpresa,
			nombre: nombre,
			password: password,
			telefono: telefono,
			cargoAdministrativo: cargoAdministrativo,
			titulocargo: titulocargo
		});
		return res.status(200).json(supervisor);
	} catch (error) {
		return res.status(500).json({ message: "Error interno del servidor.", error: error});
	};
};

const updateSupervisor = async (req,res,next) => {
	
	const { rutEmpresa, nombre, password, telefono, cargoAdministrativo, titulocargo } = req.body;

	try{
		const supervisor = await db.supervisor.findOne({where:{rutEmpresa:rutEmpresa}});

		if (!supervisor) {
			return res.status(404).json({ message: "El supervisor no existe." });
		}
		
		if (nombre) {supervisor.nombre = nombre};
		if (password) {supervisor.password = password};
		if (telefono) {supervisor.telefono = telefono};
		if (cargoAdministrativo) {supervisor.cargoAdministrativo = cargoAdministrativo};
		if (titulocargo) {supervisor.titulocargo = titulocargo};

		await supervisor.save();

		return res.status(200).json(supervisor);

	} catch(error) {
		return res.status(500).json({ message: "Error interno del servidor." });
	}

};

const buscarSupervisor = async (req,res,next) => {
	
	const { correoSupervisor } = req.body;

	try{
		const supervisor = await db.supervisor.findOne({where:{correoSupervisor:correoSupervisor}});

		if (!supervisor) {
			return res.status(404).json({ message: "El supervisor no existe." });
		}

		return res.status(200).json(supervisor);

	} catch(error) {
		return res.status(500).json({ message: "Error interno del servidor." });
	}

};

	


module.exports = {
	loginSupervisor,
	crearSupervisor,
	updateSupervisor,
	buscarSupervisor,
	AllSolicitudes
};
