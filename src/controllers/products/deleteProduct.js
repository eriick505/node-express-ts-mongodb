const mysql = require("../../mysql");

const deleteProduct = async (req, res, next) => {
  try {
    const query = "DELETE FROM products WHERE id_product = ?";
    const params = [req.body.id_product];

    await mysql.execute(query, params);

    const response = {
      message: "Successfully deleted product",
      request: {
        type: "POST",
        description: "Create new Product",
        url: `http://localhost:3000/products`,
        bodyRequest: {
          name: "String",
          price: "Number",
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = deleteProduct;
