module.exports = async function (app, multer, express) {

    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "server/uploads/files");
        },
        filename: (req, file, cb) => {
            //cb(null, file.originalname);
            //cb(null, file.mimetype + '-' + Date.now() + '.' + extension)
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            cb(null, Date.now() + '.' + extension)
        }


    });

    const limits = {
        fileSize: 400000
    }

    const fileFilter = (req, file, cb) => {

        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"||
            file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    //.single("userfile")
    app.use(express.static(__dirname));
    app.use(multer({ storage: storageConfig, fileFilter: fileFilter, limits: limits }).array('fieldname'));
};

return module.exports;