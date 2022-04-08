const mysql = require("../../mysql");

const deleteImageProduct = async (req, res, next) => {
  try {
    const query = "DELETE FROM product_images WHERE id_image = ?";
    const params = [req.params.id_image];

    await mysql.execute(query, params);

    const response = {
      message: "Successfully deleted image product",
      request: {
        type: "POST",
        description: "Create new Image Product",
        url: `http://localhost:3000/products/${req.params.id_product}/image`,
        bodyRequest: {
          name: "String",
          price: "Number",
        },
      },
    };

    return res.status(202).send(response);
  } catch (error) {
    console.log(error, "ERORRRRRRRRRRR");
    return res.status(500).send({ error });
  }
};

module.exports = deleteImageProduct;
