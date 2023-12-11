const connection = require('../config/config');

const getPaises = async(req, res) => {
    connection.query('SELECT * FROM paises', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
};

const getPaisesNombre = async(req, res) => {
    connection.query('SELECT id, nombre FROM paises', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    }); 
}

module.exports = {
    getPaises,
    getPaisesNombre
}