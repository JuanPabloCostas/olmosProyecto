// index.js

const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('dotenv').config();
// const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/test', require('./src/routes/test.routes'));

app.use('/alumnos', require('./src/routes/alumnos.routes'));

app.use('/paises', require('./src/routes/paises.routes'));

app.use('/universidades', require('./src/routes/universidades.routes'));

app.use('/solicitudes', require('./src/routes/solicitudes.routes'));

// send files in 'src/data' folder
app.use('/data', express.static('./src/data'));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

