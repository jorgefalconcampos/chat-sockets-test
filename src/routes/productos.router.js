const express = require("express");
const { uploader } = require("../utils/multer");

const productosRouter = express.Router();

const mid1 = (req, res, next) => {
    req.dato1 = "dato 1";
    next();
}

productosRouter.get("/", mid1, (req, res) => {
    return res.send({
        dato: req.dato1
    })
})

productosRouter.post("/", uploader.single("file"), (req, res) => {
    const { title, thumbnail } = req.body;

    return res.json({
        title,
        thumbnail
    })
});

module.exports = {
    productosRouter
}