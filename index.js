// index.js

// Importar el módulo express
const express = require('express');
// Definir el puerto en el que se ejecutará el servidor
const port = process.env.PORT || 3000;
// Importar el módulo cors para permitir solicitudes de diferentes dominios
const cors = require('cors');
// Importar el módulo dotenv para cargar variables de entorno desde un archivo .env
require('dotenv').config();
// Importar el módulo body-parser para analizar los cuerpos de las solicitudes HTTP
// const bodyParser = require('body-parser');

// Crear una instancia de la aplicación express
const app = express();

// Habilitar el uso de cors en la aplicación
app.use(cors());
// Habilitar el análisis de cuerpos JSON en las solicitudes
app.use(express.json());

// Ruta de inicio que devuelve un mensaje de "Hello World!"
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Rutas para el recurso "test"
app.use('/test', require('./src/routes/test.routes'));

// Rutas para el recurso "alumnos"
app.use('/alumnos', require('./src/routes/alumnos.routes'));

// Rutas para el recurso "paises"
app.use('/paises', require('./src/routes/paises.routes'));

// Rutas para el recurso "universidades"
app.use('/universidades', require('./src/routes/universidades.routes'));

// Rutas para el recurso "solicitudes"
app.use('/solicitudes', require('./src/routes/solicitudes.routes'));

// Rutas para el recurso "auth"
app.use('/login', require('./src/routes/auth.routes'));

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
