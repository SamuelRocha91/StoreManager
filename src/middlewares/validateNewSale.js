const neverZero = (array) => array.every((item) => item.quantity === 0);
module.exports = (req, res, next) => {
  const array = req.body;
  if (!array.every((item) => item.productId)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!array.every((item) => item.quantity) && !neverZero(array)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  return next();
};

//   if (array.length === 1 && !array.every((item) => item.productId)) {
    // return res.status(404).json({ message: 'Product not found' });
  // }