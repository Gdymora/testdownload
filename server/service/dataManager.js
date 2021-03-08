'use strict';
module.exports = async function (app, body, validationResult) {
    let path = require('path');
    let mime = require('mime');
    let fs = require('fs');
    const ImageKit = require("imagekit");
    const connection = await require('../db');
    const DataProviderMySQL = require('./DataProviderMySQL').DataProviderMySQL;
    const dataProvider = new DataProviderMySQL();

    app.get('/', function (req, res, next) {
        dataProvider.getMySqlUserALL(connection, res)
    });

    app.get("/resources-file/:user_id", async function (req, res, next) {
        let file = await dataProvider.getMySqlUserFile(connection, res, req)
        let imageURL;
        file.forEach(element => {
            console.log(element.id);
            let file = process.cwd() + '/' + element.destination + '/' + element.file_name;
            let filename = path.basename(file);


        });
        res.send({ "name": filename});
    });

    app.post("/file", function (req, res, next) {
        let file = process.cwd() + '/' + req.body.destination + '/' + req.body.file_name;
        let filename = path.basename(file);
        let mimetype = mime.lookup(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        let filestream = fs.createReadStream(file);
        filestream.pipe(res);
    });

    app.put('/user',
        body('email').isEmail(),
        body('firstName').isLength({ min: 15 }),
        async function (req, res, next) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.json({ result: "error", msg: `"Mysql error:" ${errors.array()}` });
            }

            await dataProvider.setMySqlUserCreate(connection, res, req);
        });


    app.post("/upload", async function (req, res, next) {
        let filedata = req.files;
        if (!filedata) {
            console.log("errror");
            res.json({ result: "error", msg: "filedata error" });
        }
        else {
            console.log("success upload");
            await dataProvider.setMySqlUserFilesCreate(connection, res, req);
        }
    });


    app.post('/user', async function (req, res, next) {
        await dataProvider.getMySqlUserSearch(connection, res, req);
    });
};