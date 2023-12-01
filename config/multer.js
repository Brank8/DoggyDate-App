const multer = require('multer')
const path = require('path')


// const fileStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
const fileStorage = multer.memoryStorage()

const upload = multer({ storage: fileStorage })

module.exports = upload