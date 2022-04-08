const mysql = require("../../mysql");

const postOrder = async (req, res, next) => {
  try {
    const productQuery = "SELECT * FROM products WHERE id_product = ?";
    const idProduct = req.body.id_product;
    const quantity = req.body.quantity;

    const productResult = await mysql.execute(productQuery, [idProduct]);

    if (productResult.length === 0)
      return res.status(404).send({ message: "Product Not Found" });

    const orderQuery =
      "INSERT INTO orders (id_product, quantity) VALUES (?, ?)";
    const params = [idProduct, quantity];

    const orderResult = await mysql.execute(orderQuery, params);

    const response = {
      message: "Successfully created order",
      order: {
        id_order: orderResult.insertId,
        id_product: req.body.id_product,
        quantity: req.body.quantity,
        request: {
          type: "GET",
          description: "Return all orders",
          url: `http://localhost:3000/orders`,
        },
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = postOrder;
