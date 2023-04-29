const connection = require('./connection');

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const selectMaxIndex = async () => {
  const [[result]] = await connection.execute(
    'SELECT Max(id) AS "index" FROM StoreManager.sales;',
  );
  return result;
};

const insertSale = async (array) => {
  const maxIndex = await selectMaxIndex();
  const newIndex = maxIndex.index + 1;
  await connection.execute(
    'INSERT INTO StoreManager.sales (id) value(?)',
    [newIndex],
  );
  array.map(async ({ productId, quantity }) => connection.execute(
    `INSERT INTO StoreManager.sales_products ( sale_id, product_id, quantity)
  SELECT s.id, ${productId}, ${quantity} FROM StoreManager.sales AS s order by id DESC LIMIT 1;`,
    ));
  return true;
};

module.exports = {
  findById,
  insertSale,
  selectMaxIndex,
};
