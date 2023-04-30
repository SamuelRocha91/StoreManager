const salesModel = require('../models/sales.models');

const findProducts = async (array) => {
  let total = 0;
  const promises = array.map(async (element) => {
    const result = await salesModel.findById(Number(element.productId));
    if (result) {
      total += 1;
    }
  });
      await Promise.all(promises); 
  return total;
};

const findAll = async () => {
  const result = await salesModel.findAll();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await salesModel.findById2(id);
  if (result.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: null };
  }
  return { type: null, message: result };
};

const createSale = async (array) => {
  if (!array.every((item) => Number(item.quantity) > 0)) {
    return { type: 'QUANTITY_INVALID', message: '"quantity" must be greater than or equal to 1' };
  }
  const total = await findProducts(array);
  if (total !== array.length) {
    return { type: 'INVALID_VALUE', message: 'Product not found' };
  }
  await salesModel.insertSale(array);
  const newIndex = await salesModel.selectMaxIndex();
  return {
    type: null, message: { id: newIndex.index, itemsSold: array },
};
};

module.exports = {
  createSale,
  findProducts,
  findAll, 
  findById,
};
