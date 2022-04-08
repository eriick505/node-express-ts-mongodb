import { Request, Response } from "express";
import { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@models/User";

import { validateBodyFieldsExist } from "@utils/validateBodyFieldsExist";

import type { IUserSignupRequest, IUser } from "@type/user";
import type { ResponseError } from "@type/common";

type ResponseSignUp = {
  message: string;
  user: IUser;
  token: string;
};

const signUp = async (
  req: Request<{}, {}, IUserSignupRequest>,
  res: Response<ResponseSignUp | ResponseError>
) => {
  try {
    const { name, email, phone, password } = req.body;

    validateBodyFieldsExist({
      name,
      email,
      phone,
      password,
    });

    const hasUserRegistered = await User.findOne({ email });

    if (hasUserRegistered) {
      return res.status(409).send({ error: "Already registered user" });
    }

    const hash = hashSync(password, 10);

    if (!hash) return res.status(500).send({ error: "User creation failed" });

    const user: IUser = {
      name,
      email,
      phone,
    };

    const userCreated = await User.create({ ...user, password: hash });

    const userCreatedToToken = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
    };

    const token = jwt.sign(userCreatedToToken, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    const response = {
      message: "Successfully created user",
      user,
      token,
    };

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default signUp;
