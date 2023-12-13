// src/config/config.js

// Importar los módulos necesarios
const mysql = require('mysql2');
const fs = require('fs');

// Leer el archivo de certificado del servidor
const serverCa = fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem', 'utf8');

// Crear la conexión a la base de datos MySQL
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

// Establecer la conexión a la base de datos
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// Exportar la conexión para que pueda ser utilizada en otros archivos
module.exports = connection;
