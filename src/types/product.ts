import { Schema } from "mongoose";

export interface IProduct {
  name: string;
  price: string;
  image_product: Object;
  categoryId: Schema.Types.ObjectId;
}

export interface IPostProductRequest {
  name: string;
  price: string;
  image_product: string;
  categoryId: string;
  file: {
    path: string;
  };
}
