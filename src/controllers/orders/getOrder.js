const mysql = require("../../mysql");

const getOrder = async (req, res, next) => {
  try {
    const query = "SELECT * FROM orders WHERE id_order = ?";
    const params = [req.params.id_order];

    const results = await mysql.execute(query, params);

    if (results.length === 0)
      return res.status(404).send({ message: "Order Not Found" });

    const response = {
      order: {
        id_order: results[0].id_order,
        id_product: results[0].id_product,
        quantity: results[0].quantity,
        request: {
          type: "GET",
          description: "Return all Orders",
          url: `http://localhost:3000/order`,
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = getOrder;
