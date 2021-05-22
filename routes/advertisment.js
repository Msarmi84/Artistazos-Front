var express = require("express");
var router = express.Router();
const controller = require("../controller/advertisement.Controller");
const uploadFile = require("../middleware/uploadImage");

//localhost:3000/advertisement
router.get("/find", controller.findAdvertisements);

//localhost:3000/advertisement/:id
router.get("/", controller.getAdvertisement);

router.post("/",
    uploadFile("advertisement_photo"),
    controller.createAdvertisement
);

router.delete("/:user_id", controller.deleteAdvertisement);

//localhost:3000/advertisement/foruser/:id
//router.get("/foruser/:id", controller.getAdvertisementForUser);

// Add a advertisement for user
//router.post("/foruser/:id", controller.addAdvertisementsForUser);

module.exports = router;
