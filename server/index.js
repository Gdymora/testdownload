require('dotenv').config()

const express = require("express");
const multer = require("multer");
const { body, validationResult } = require("express-validator");

const app = express();

app.set('trust proxy', '8.8.8.8');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  adjustment to the CORS 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();  //pass request processing...
});

require('./configMulter')(app, multer, express);
require('./service/dataManager')(app, body, validationResult);

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);