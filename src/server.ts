import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import { url } from "@configs/mongodb";
import userRouter from "@routes/users";
import productRouter from "@routes/products";
import categoryRouter from "@routes/category";

interface ErrorMsgWithStatus {
  status?: number;
  message: string;
}

const connectDB = async () => {
  try {
    await mongoose.connect(url);

    const app = express();
    const port = process.env["PORT"] || 3333;

    app.use(cors());
    app.use(morgan("dev"));
    app.use("/uploads", express.static("uploads"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");

      res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
      );

      if (req.method === "OPTIONS") {
        req.header("Access-Control-Allow-Methods");

        return res.status(200).send({});
      }

      next();
    });

    // routes
    app.use("/user", userRouter);
    app.use("/product", productRouter);
    app.use("/category", categoryRouter);

    app.use((req, res, next) => {
      const error: ErrorMsgWithStatus = {
        message: "Endpoint not found",
        status: 404,
      };

      return res.status(error.status || 500).send({
        message: error.message,
      });
    });

    app.listen(port);

    console.log("Connected to the MongoDB");
  } catch (error) {
    console.log(error, "fail to connect to MongoDB");
  }
};

connectDB();
