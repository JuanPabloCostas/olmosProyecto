
const connection = require('../config/config');

const getUniversidades = async(req, res) => {
    connection.query('SELECT * FROM universidades', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
};

const getUniversidad = async(req, res) => {
    const {id} = req.params;
    connection.query('SELECT * FROM universidades WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
}

module.exports = {
    getUniversidades,
    getUniversidad
}
