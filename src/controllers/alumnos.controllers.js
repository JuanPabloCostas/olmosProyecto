// Importar la configuración de la conexión a la base de datos
const connection = require('../config/config');

// Obtener todos los alumnos
const getAlumnos = async(req, res) => {
    connection.query('SELECT * FROM alumnos', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
};

// Obtener un alumno por su expediente
const getAlumno = async(req, res) => {
    const {expediente} = req.params;
    connection.query('SELECT * FROM alumnos WHERE expediente = ?', [expediente], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
}

// Crear un nuevo alumno
const createAlumno = async(req, res) => {
    const {expediente, password, nombre} = req.body;
    connection.query('INSERT INTO alumnos (expediente, password, nombre, type) VALUES (?, ?, ?, 0)', [expediente, password, nombre], (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    }); 
}

// Exportar los controladores
module.exports = {
    getAlumnos,
    getAlumno,
    createAlumno
}