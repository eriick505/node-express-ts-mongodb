import { Schema } from "mongoose";
import Category from "@models/Category";

const getCategoryNameById = async (id: Schema.Types.ObjectId) => {
  const categoryResult = await Category.findById(id);

  if (!categoryResult) return null;

  return categoryResult.name;
};

export default getCategoryNameById;
