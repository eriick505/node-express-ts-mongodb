import { Request, Response } from "express";

import Category from "@models/Category";

import type {
  IPostCategoryRequest,
  IPostCategoryResponse,
} from "@type/category";
import type { ResponseError } from "@type/common";

const postCategory = async (
  req: Request<{}, {}, IPostCategoryRequest>,
  res: Response<IPostCategoryResponse | ResponseError>
) => {
  try {
    const { name } = req.body;

    const isCategoryExist = await Category.findOne({ name });

    if (isCategoryExist) {
      return res.status(409).send({ error: "Already registered Category" });
    }

    const newCategory = await Category.create({
      name,
    });

    const response = {
      message: "Successfully created Category",
      categoryCreated: {
        categoryId: newCategory._id.toString(),
        name: req.body.name,
      },
      request: {
        type: "GET",
        description: "Return all categories",
        url: `http://localhost:3000/categories`,
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default postCategory;
