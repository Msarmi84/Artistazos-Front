const multer = require("multer");

function uploadMultipleFiles(fields) {
    let storage = multer.diskStorage({
        destination: function(req, file, cb) {
            const img = {
                url: `./public/images/uploads`,
                typeJpg: "image/jpeg",
                typePng: "image/png",
            };
            const mp3 = {
                url: `./public/sound/uploads`,
                type: "audio/mpeg",
            };
            const video = {
                url: `./public/video/uploads`,
                type: "video/mp4",
            };
            const pdf = {
                url: `./public/pdf/uploads`,
                type: "application/pdf",
            };
            let dest;
            if (file.mimetype === img.typeJpg || file.mimetype === img.typePng) {
                dest = img.url;
            } else if (file.mimetype === mp3.type) {
                dest = mp3.url;
            } else if (file.mimetype === video.type) {
                dest = video.url;
            } else if (file.mimetype === pdf.type) {
                dest = pdf.url;
            }
            cb(null, dest);
        },
        filename: function(req, file, cb) {
            console.log(file);
            const extension = file.originalname.slice(
                file.originalname.lastIndexOf(".")
            );
            cb(null, Date.now() + extension);
        },
    });
    let upload = multer({ storage }).fields(fields);
    return upload;
}

module.exports = uploadMultipleFiles;