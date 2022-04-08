import { Types } from "mongoose";

import { Request, Response } from "express";

import Product from "@models/Product";
import Category from "@models/Category";

import type { IPostProductRequest } from "@type/product";

const postProduct = async (
  req: Request<{}, {}, IPostProductRequest>,
  res: Response
) => {
  try {
    const { name, price, categoryId } = req.body;
    const { file } = req;

    const product = {
      name,
      price,
      categoryId,
      image_product: file,
    };

    const isCategoryIdValidy = Types.ObjectId.isValid(categoryId);

    if (!isCategoryIdValidy)
      return res.status(400).send({ error: "Category ID is not valid" });

    const categoryFound = await Category.findById(categoryId);

    if (!categoryFound)
      return res.status(404).send({ error: "Category not exist" });

    const productCreated = await Product.create(product);

    const response = {
      message: "Successfully created product",
      product: {
        id_product: productCreated._id,
        name,
        price,
        image_product: file.path,
        categoryId: productCreated.categoryId,
      },
      request: {
        type: "GET",
        description: "Return all Products",
        url: `http://localhost:3000/products`,
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default postProduct;
