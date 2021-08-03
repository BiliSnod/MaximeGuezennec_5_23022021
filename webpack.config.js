const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    cart: "./assets/js/cart.js",
    index: "./assets/js/index.js",
    order: "./assets/js/order.js",
    product: "./assets/js/product.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/js")
  }
};
