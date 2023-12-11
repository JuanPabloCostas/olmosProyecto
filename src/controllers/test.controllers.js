// test.controllers.js

const connection = require('../config/config');

const getTest = async(req, res) => {
    connection.query('SELECT * FROM dummy_table', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
}

module.exports = {
    getTest
}