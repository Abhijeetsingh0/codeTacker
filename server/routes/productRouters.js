const express = require("express")
const router = express.Router();
const productController = require("../controller/productController")
const {authenticate} = require("../middlewares/auth")

router.post("/",productController.createProduct)
router.get("/",productController.getProducts)
router.get("/:id",productController.getProductById)
router.put("/:id",productController.putProduct)
router.delete("/:id",authenticate,productController.deleteProduct)

module.exports = router