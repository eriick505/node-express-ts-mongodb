const mysql = require("../../mysql");

const getAllOrders = async (req, res, next) => {
  try {
    const query = `SELECT orders.id_order,
                          orders.quantity, 
                          products.id_product,
                          products.name,
                          products.price  
                     FROM orders
               INNER JOIN products
                       ON products.id_product = orders.id_product;`;

    const results = await mysql.execute(query);

    const response = {
      quantityOrders: results.length,
      orders: results.map((order) => ({
        id_order: order.id_order,
        quantity: order.quantity,
        product: {
          id_product: order.id_product,
          name: order.name,
          order: order.price,
        },
        request: {
          type: "GET",
          description: "Get order details",
          url: `http://localhost:3000/orders/${order.id_order}`,
        },
      })),
    };

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = getAllOrders;
