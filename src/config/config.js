// src/config/config.js

const mysql = require('mysql2');
const fs = require('fs');

const serverCa = fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem', 'utf8');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = connection;
