import User from "../../models/User.js";

const editUserById = async (req, res) => {
  const { id } = req.params;

  const { name, email, phone } = req.body;

  const userEdit = { name, email, phone };

  try {
    await User.findByIdAndUpdate(id, userEdit);

    return res.status(201).send("user editado com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

export default editUserById;
