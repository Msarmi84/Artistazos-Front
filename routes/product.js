var express = require("express");
var router = express.Router();
const controller = require("../controller/product.Controller");
const uploadFile = require("../middleware/uploadImage");
const verify = require("../middleware/verify");
const upload = require("../middleware/uploadImage");

//localhost:3000/users/login

// router.get('/verify',controller.verifyToken)

//localhost:3000/products
router.get("/", controller.getProducts);

//localhost:3000/products/allProducts/:user_id
router.get("/allProducts/:user_id", controller.getProductsByUserId);

// router.get('/buscar', controller.searchProducts);
router.get("/:id", controller.getProductById);
router.post(
    "/saveProduct/:user_id",
    uploadFile("product_photo"),
    controller.addProduct
);
router.put(
    "/:product_id",
    uploadFile("product_photo"),
    controller.updateProduct
);

//localhost:3000/products/:product_id
router.delete("/:product_id", controller.deleteProduct);
// router.post('/buscar', verify, controller.searchProducts);
// router.post('/:id/comprar', verify, controller.comprarProduct);

module.exports = router;