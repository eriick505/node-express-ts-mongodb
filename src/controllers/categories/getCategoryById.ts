import { Types } from "mongoose";
import { Request, Response } from "express";

import Category from "@models/Category";

import type { IGetCategoryByIdResponse } from "@type/category";
import type { ResponseError } from "@type/common";

const getCategoryById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response<IGetCategoryByIdResponse | ResponseError>
) => {
  try {
    const { id } = req.params;

    const isCategoryIdValidy = Types.ObjectId.isValid(id);

    if (!isCategoryIdValidy)
      return res.status(400).send({ error: "Category ID is not valid" });

    const categoryFound = await Category.findById(id);

    if (!categoryFound)
      return res.status(404).send({ error: "Category not exist" });

    const response = {
      message: "Successfully created product",
      category: {
        categoryId: id,
        name: categoryFound.name,
      },
      request: {
        type: "GET",
        description: "Return all Categories",
        url: `http://localhost:3000/category`,
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default getCategoryById;
