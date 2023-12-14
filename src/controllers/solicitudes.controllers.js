const connection = require('../config/config');

const processForm = require('../middleware/ProcessFile')
const uploadToAzureStorage = require('../middleware/upload')
const generateName = require('../middleware/randomname')

// Función para obtener todas las solicitudes
const getSolicitudes = async(req, res) => {
    connection.query('SELECT * FROM solicitudes', (err, result) => {
        if (err) throw err;
        return res.status(200).json(result);
    });
};

// Función para obtener una solicitud específica por su expediente
const getSolicitud = async(req, res) => {
    const {expediente} = req.params;
    connection.query('SELECT * FROM solicitudes WHERE expediente = ?', [expediente], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
}

// Función para crear una nueva solicitud
const createSolicitud = async(req, res) => {
    try {
        const {expediente} = req.params;

        // Procesar los archivos adjuntos de la solicitud
        await processForm(req, res);

        const files = [
            req.files['file1'][0],
            req.files['file2'][0],
            req.files['file3'][0],
        ]

        // Change the name of the files
        files[0].originalname = generateName(files[0].originalname);
        files[1].originalname = generateName(files[1].originalname);
        files[2].originalname = generateName(files[2].originalname);


        // Subir los archivos a Azure Storage
        await uploadToAzureStorage(files[0]);
        await uploadToAzureStorage(files[1]);
        await uploadToAzureStorage(files[2]);

        // Crear un nuevo objeto de solicitud con los datos recibidos
        const newSolicitud = [
            expediente,
            files[0].originalname,
            files[1].originalname,
            files[2].originalname,
            0,
        ]

        // Insertar la nueva solicitud en la base de datos
        connection.query('INSERT INTO solicitudes (expediente, file1, file2, file3, status) VALUES (?, ?, ?, ?, ?)', newSolicitud, (err, result) => {
            if (err) throw err;
            return res.status(200).json({message: 'Solicitud creada con éxito'});
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Error al crear la solicitud'});
    }
}

// Función para actualizar el estado de una solicitud
const updateSolicitudStatus = async(req, res) => {
    try {
        const {expediente} = req.params;
        const {status} = req.body;

        // Actualizar el estado de la solicitud en la base de datos
        connection.query('UPDATE solicitudes SET status = ? WHERE expediente = ?', [status, expediente], (err, result) => {
            if (err) throw err;
            res.status(200).json({message: 'Solicitud actualizada con éxito'});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al actualizar la solicitud'});
    }
}

module.exports = {
    getSolicitudes,
    getSolicitud,
    createSolicitud,
    updateSolicitudStatus
}
