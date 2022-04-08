const express = require("express");
const router = express.Router();
const login = require("../middleware/login");

const deleteImageProduct = require("../controllers/productImages/deleteImageProduct");

router.delete(
  "/:id_product/image/:id_image",
  login.required,
  deleteImageProduct
);

module.exports = router;
