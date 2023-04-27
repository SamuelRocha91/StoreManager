const productsModel = require('../models/products.model');

const allProducts = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const productsById = async (productId) => {
  const result = await productsModel.findById(productId);
  // pode-se fazer isso na validation antes e tipo se if.type return error
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const result = await productsModel.insertProduct(name);
  const newProduct = await productsModel.findById(result);
  console.log(newProduct);
  return { type: null, message: newProduct };
};
module.exports = {
  allProducts,
  productsById,
  createProduct,
};