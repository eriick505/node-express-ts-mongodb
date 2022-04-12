import multer from "multer";
import { Router } from "express";

import { required } from "../middleware/login";

import {
  getProductList,
  postProduct,
  deleteProduct,
} from "@controllers/products";
// import postProductController from "../controllers/products/postProduct";
// import getProductController from "../controllers/products/getProduct";
// import updateProductController from "../controllers/products/updateProduct";
// import deleteProductController from "../controllers/products/deleteProduct";

// import postImageProductController from "../controllers/productImages/postImageProduct";
// import getImagesProductController from "../controllers/productImages/getImagesProduct";

const productRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    const data = new Date().toISOString().replace(/:/g, "-") + "-";
    callback(null, data + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});

productRouter.get("/", getProductList);
productRouter.post("/", required, upload.single("product_image"), postProduct);
productRouter.delete("/:product_id", required, deleteProduct);

// productRouter.get("/:product_id", getProductController);
// productRouter.patch("/", login.required, updateProductController);
// productRouter.delete("/", login.required, deleteProductController);

// productRouter.post(
//   "/:id_product/image",
//   login.required,
//   upload.single("product_image"),
//   postImageProductController
// );
// productRouter.get("/:id_product/images", getImagesProductController);

export default productRouter;
