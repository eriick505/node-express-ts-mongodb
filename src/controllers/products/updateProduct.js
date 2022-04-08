const mysql = require("../../mysql");

const updateProduct = async (req, res, next) => {
  try {
    const query =
      "UPDATE products SET name = ?, price = ?, categoryId = ? WHERE id_product = ?";
    const params = [
      req.body.name,
      req.body.price,
      req.body.categoryId,
      req.body.id_product,
    ];

    await mysql.execute(query, params);

    const response = {
      message: "Successfully update product",
      product: {
        id_product: req.body.id_product,
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId,
        request: {
          type: "GET",
          description: "Get product details",
          url: `http://localhost:3000/products/${req.body.id_product}`,
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = updateProduct;
