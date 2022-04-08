import { Request, Response } from "express";

import Product from "@models/Product";
import getCategoryNameById from "@utils/getCategoryNameById";

const getProductList = async (req: Request, res: Response) => {
  try {
    const productList = await Product.find();

    if (productList.length === 0) {
      return res.status(404).send({ error: "Não existe produtos cadastrado" });
    }

    const productsPromise = productList.map(async (product) => ({
      id_product: product._id,
      name: product.name,
      price: product.price,
      image_product: product.image_product,
      category: {
        categoryId: product.categoryId,
        name: await getCategoryNameById(product.categoryId),
      },
    }));

    const products = await Promise.all(productsPromise);

    const response = {
      quantity: productList.length,
      products,
      request: {
        type: "GET",
        description: "Get product details",
        url: "http://localhost:3000/products/PRODUCT_ID",
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default getProductList;
