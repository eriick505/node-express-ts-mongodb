import { RequestRecommended } from "./common";

export interface ICategory {
  name: string;
}

export interface ICategoryWithID extends ICategory {
  id: string;
}

export interface IGetAllCategoriesResponse {
  quantity: number;
  categories: ICategory[];
}

export interface IPostCategoryRequest {
  name: string;
}

export interface IPostCategoryResponse {
  message: string;
  categoryCreated: {
    categoryId: string;
    name: string;
  };
  request: RequestRecommended;
}

export interface IGetCategoryByIdResponse {
  message: string;
  category: {
    categoryId: string;
    name: string;
  };
  request: RequestRecommended;
}
