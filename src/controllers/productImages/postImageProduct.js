const mysql = require("../../mysql");

const postImageProduct = async (req, res, next) => {
  try {
    const query =
      "INSERT INTO product_images (id_product, image_path) VALUES (?, ?)";
    const params = [req.params.id_product, req.file.path];

    const results = await mysql.execute(query, params);

    const response = {
      message: "Success in add product image ",
      image: {
        id_image: results.insertId,
        id_product: Number(req.params.id_product),
        image_product: req.file.path,
        request: {
          type: "GET",
          description: "Return all Image Products",
          url: `/products/${req.params.id_product}/images`,
        },
      },
    };

    return res.status(201).send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

module.exports = postImageProduct;
