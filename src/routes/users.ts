import { Router } from "express";
import { signUp, login, getUserByToken } from "@controllers/users";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/get-user", getUserByToken);

export default userRouter;
