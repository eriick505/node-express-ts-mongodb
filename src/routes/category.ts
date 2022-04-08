import { Router } from "express";
import { required } from "../middleware/login";

import {
  getAllCategories,
  postCategory,
  getCategoryById,
} from "@controllers/categories";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", required, postCategory);

export default categoryRouter;
