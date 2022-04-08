import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@models/User";

import { validateBodyFieldsExist } from "@utils/validateBodyFieldsExist";

import type { IUserLoginRequest, IUserLoginResponse } from "@type/user";
import type { ResponseError } from "@type/common";

const login = async (
  req: Request<{}, {}, IUserLoginRequest>,
  res: Response<IUserLoginResponse | ResponseError>
) => {
  try {
    const { email, password } = req.body;

    validateBodyFieldsExist({
      email,
      password,
    });

    const hasUserRegistered = await User.findOne({ email });

    if (!hasUserRegistered)
      return res.status(401).send({ error: "Couldn't find your Account" });

    const passwordHashDB = hasUserRegistered.password;

    const bCryptResult = bcrypt.compareSync(password, passwordHashDB);

    if (!bCryptResult || !passwordHashDB)
      return res.status(401).send({ error: "Email or password invalid" });

    const id = hasUserRegistered._id;
    const name = hasUserRegistered.name;

    const userLogin = {
      id,
      name,
      email,
    };

    const token = jwt.sign(userLogin, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).send({ message: "Successfully logged in", token });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default login;
