import { Schema, model } from "mongoose";

import type { IProduct } from "@type/product";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image_product: { type: Object, required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
