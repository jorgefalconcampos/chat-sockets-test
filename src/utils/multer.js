const multer = require("multer")
// const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + "/public/uploads")

    },

    filename: function(req, file, cb) {
        cb(null, file.originalname)

    }

});

const uploader = multer({storage})

module.exports = {
    uploader
}

// te quedaste en 2:35:12