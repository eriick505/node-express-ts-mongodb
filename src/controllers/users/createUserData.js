import User from "../../models/User.js";

const createUserData = async (req, res) => {
  const user = {
    ...req.body,
  };

  try {
    await User.create(user);

    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default createUserData;
