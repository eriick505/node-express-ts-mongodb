import { Response } from "express";

import Category from "@models/Category";

import type { IGetAllCategoriesResponse } from "@type/category";
import type { ResponseError } from "@type/common";

const getAllCategories = async (
  req,
  res: Response<IGetAllCategoriesResponse | ResponseError>
) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res
        .status(404)
        .send({ error: "Não existe categorias cadastradas" });
    }

    const response = {
      quantity: categories.length,
      categories: categories.map((category) => ({
        categoryId: category._id,
        name: category.name,
      })),
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default getAllCategories;
