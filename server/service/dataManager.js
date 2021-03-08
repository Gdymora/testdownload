'use strict';
module.exports = async function (app, body, validationResult) {
    var path = require('path');
    var mime = require('mime');
    var fs = require('fs');
    const connection = await require('../db');
    const DataProviderMySQL = require('./DataProviderMySQL').DataProviderMySQL;
    const dataProvider = new DataProviderMySQL();

    app.get('/', function (req, res, next) {      
        dataProvider.getMySqlUserALL(connection, res)
    });

    app.get("/image-test", function (req, res, next) {
        var file = process.cwd() + '/server/uploads/files/1615016936542.jpeg';
        var filename = path.basename(file);
        var mimetype = mime.lookup(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
    });

    app.post("/file", function (req, res, next) {
        console.log(req);
        var file = process.cwd() + '/' + req.body.destination + '/' + req.body.file_name;
        var filename = path.basename(file);
        var mimetype = mime.lookup(file);
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        var filestream = fs.createReadStream(file);
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