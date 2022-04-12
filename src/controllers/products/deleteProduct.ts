import { Types } from "mongoose";
import { Request, Response } from "express";

import Product from "@models/Product";

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.params;

    const isProductIdValidy = Types.ObjectId.isValid(product_id);

    if (!isProductIdValidy)
      return res.status(400).send({ error: "Product ID is not valid" });

    const productFound = await Product.findById(product_id);

    if (!productFound)
      return res.status(404).send({ error: "Product not found" });

    await Product.findByIdAndDelete(product_id);

    const response = {
      message: "Product successfully deleted",
      product: {
        id_product: product_id,
        name: productFound.name,
      },
      request: {
        type: "GET",
        description: "Return all products",
        url: `http://localhost:3000/product`,
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default deleteProduct;
