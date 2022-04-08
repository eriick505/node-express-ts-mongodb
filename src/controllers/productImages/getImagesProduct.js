const mysql = require("../../mysql");

const getAllProducts = async (req, res, next) => {
  try {
    const query = "SELECT * FROM product_images WHERE id_product = ?";
    const params = [req.params.id_product];

    const result = await mysql.execute(query, params);

    const response = {
      quantity: result.length,
      products: result.map((img) => ({
        id_product: img.id_product,
        id_image: img.id_image,
        image_product: img.image_path,
      })),
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = getAllProducts;
