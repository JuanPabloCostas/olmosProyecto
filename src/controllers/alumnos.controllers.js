const connection = require('../config/config');

const getAlumnos = async(req, res) => {
    connection.query('SELECT * FROM alumnos', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
};

const getAlumno = async(req, res) => {
    const {expediente} = req.params;
    connection.query('SELECT * FROM alumnos WHERE expediente = ?', [expediente], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
}

const createAlumno = async(req, res) => {
    const {expediente, password, nombre} = req.body;
    connection.query('INSERT INTO alumnos (expediente, password, nombre, type) VALUES (?, ?, ?, 0)', [expediente, password, nombre], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    }); 
}

module.exports = {
    getAlumnos,
    getAlumno,
    createAlumno
}