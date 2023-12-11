const util = require('util');
const multer = require('multer');
const generateName = require('./randomname')

// Create an instance of multer 
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
  
  
  let processFormMiddleware = util.promisify(processForm);
  module.exports = processFormMiddleware; 