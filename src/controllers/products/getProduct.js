const mysql = require("../../mysql");
const getCategoryNameById = require("../../utils/getCategoryNameById");

const getProduct = async (req, res, next) => {
  try {
    const query = "SELECT * FROM products WHERE id_product = ?";
    const params = [req.params.product_id];

    const result = await mysql.execute(query, params);

    if (result.length === 0)
      return res.status(404).send({ message: "Product Not Found" });

    const categoryName = await getCategoryNameById(result[0].categoryId);

    const response = {
      product: {
        id_product: result[0].id_product,
        name: result[0].name,
        price: result[0].price,
        image_product: result[0].image_product,
        category: {
          categoryId: result[0].categoryId,
          name: categoryName,
        },
        request: {
          type: "GET",
          description: "Return all Products",
          url: `http://localhost:3000/products`,
        },
      },
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = getProduct;
