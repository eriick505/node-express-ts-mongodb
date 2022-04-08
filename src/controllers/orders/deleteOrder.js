const mysql = require("../../mysql");

const deleteOrder = async (req, res, next) => {
  try {
    const query = "DELETE FROM orders WHERE id_order = ?";
    const params = [req.body.id_order];

    await mysql.execute(query, params);

    const response = {
      message: "Successfully deleted order",
      request: {
        type: "POST",
        description: "Create new Order",
        url: `http://localhost:3000/orders`,
        bodyRequest: {
          id_product: "Number",
          quantity: "Number",
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = deleteOrder;
