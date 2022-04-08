import { Request, Response } from "express";

import User from "@models/User";

const getUsersData = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const response = {
      listUsers: users.map((userData) => ({
        id: userData._id,
        name: userData.name,
        email: userData.email,
      })),
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default getUsersData;
