const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render('welcome');
});

router.get("/login", (req, res, next) => {
    res.send("Login from root Page");
});

module.exports = router;