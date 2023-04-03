const { Router } = require('express');

const viewsRouter = Router();

// viewsRouter.get("/", (req, res) => {
//     res.render("chat", {});
// })

viewsRouter.get("/", (req, res) => {
    res.render("index", {});
})

viewsRouter.get("/register", (req, res) => {
    res.render("register");
})

module.exports = {
    viewsRouter
};