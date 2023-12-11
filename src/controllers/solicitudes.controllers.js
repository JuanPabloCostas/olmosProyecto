const connection = require('../config/config');

const processForm = require('../middleware/ProcessFile')

const getSolicitudes = async(req, res) => {
    connection.query('SELECT * FROM solicitudes', (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
};

const getSolicitud = async(req, res) => {
    const {expediente} = req.params;
    connection.query('SELECT * FROM solicitudes WHERE expediente = ?', [expediente], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
    });
}

const createSolicitud = async(req, res) => {
    try {
        
        const {expediente} = req.params;

        await processForm(req, res);

        const files = [
            req.files['file1'][0],
            req.files['file2'][0],
            req.files['file3'][0],
        ]

        // console.log(files);

        const newSolicitud = [
            expediente,
            files[0].filename,
            files[1].filename,
            files[2].filename,
            0,
        ]

        console.log(newSolicitud);

        connection.query('INSERT INTO solicitudes (expediente, file1, file2, file3, status) VALUES (?, ?, ?, ?, ?)', newSolicitud, (err, result) => {
            if (err) throw err;
            res.status(200).json({message: 'Solicitud creada con éxito'});
        });
        


    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error al crear la solicitud'});
        
    }
}

const updateSolicitudStatus = async(req, res) => {
    try {
        const {expediente} = req.params;
        const {status} = req.body;

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
