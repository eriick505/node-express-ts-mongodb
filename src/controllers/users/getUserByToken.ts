import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "@models/User";

import type { ResponseError } from "@type/common";
import type { IUserByTokenResponse } from "@type/user";

interface GetUserByToken {
  user: IUserByTokenResponse;
}

const getUserByToken = async (
  req: Request,
  res: Response<GetUserByToken | ResponseError>
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const decode = jwt.verify(
      token,
      process.env.JWT_KEY
    ) as IUserByTokenResponse;

    if (!decode) {
      return res.status(500).send({ error: "Token is not invalid" });
    }

    const id = decode.id;

    const user = await User.findById(id);

    if (!user) return res.status(404).send({ error: "User not exist" });

    const response = {
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone ?? null,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
};

export default getUserByToken;
