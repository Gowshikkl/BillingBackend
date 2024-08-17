const express = require("express");
const { get_products, add_product, update_product, delete_product } = require("../controllers/product.controller");
const router = express.Router();


router.get("/products_list",get_products);
router.post("/add_products",add_product);
router.put("/update_product",update_product);
router.delete("/delete_product",delete_product);

module.exports = router;