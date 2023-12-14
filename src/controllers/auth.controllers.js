const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connection = require('../config/config');

const login = async(req, res) => {
    // console.log(req.body);
    const {expediente, password} = req.body;
    connection.query('SELECT * FROM alumnos WHERE expediente = ?', [expediente], async(err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).json({error: 'Expediente no encontrado'});
        }
        const alumno = result[0];
        const isMatch = await bcrypt.compare(password, alumno.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Contraseña incorrecta'});
        }
        const token = jwt.sign({expediente: alumno.expediente}, process.env.JWT_SECRET);
        res.status(200).json({
            token: token,
            type: alumno.type,
            nombre: alumno.nombre,
            expediente: alumno.expediente,
        });
    });
}

const registerAlumno = async(req, res) => {
    const {expediente, password, nombre} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAlumno = [
        expediente,
        hashedPassword,
        0,
        nombre,
    ]
    connection.query('INSERT INTO alumnos (expediente, password, type, nombre) VALUES (?, ?, ?, ?)', newAlumno, (err, result) => {
        if (err) throw err;
        res.status(201).json({message: 'Alumno registrado'});
    });
}

const registerAdmin = async(req, res) => {
    const {expediente, password, nombre} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = [
        expediente,
        hashedPassword,
        1,
        nombre,
    ]
    connection.query('INSERT INTO alumnos (expediente, password, type, nombre) VALUES (?, ?, ?, ?)', newAdmin, (err, result) => {
        if (err) throw err;
        res.status(201).json({message: 'Administrador registrado'});
    });
}

module.exports = {
    login,
    registerAlumno,
    registerAdmin,
};