// Importar las dependencias necesarias
const util = require('util');
const multer = require('multer');
const generateName = require('./randomname')

// Crear una instancia de multer
let processForm = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/data');
    },
    filename: function (req, file, cb) {
      cb(null, generateName(file.originalname));
    }
  })
}).fields([
  { name: 'file1', maxCount: 1 },
  { name: 'file2', maxCount: 1},
  { name: 'file3', maxCount: 1 },
]);

// Convertir la función processForm en una promesa utilizando util.promisify
let processFormMiddleware = util.promisify(processForm);

// Exportar el middleware para su uso en otros archivos
module.exports = processFormMiddleware;
