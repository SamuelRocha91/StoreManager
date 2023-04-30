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

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.id AS saleId, s.date, ss.product_id AS productId, ss.quantity 
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS ss ON s.id = ss.sale_id ORDER BY saleId, productId;`,
  );
  return result;
};

const findById2 = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
     FROM StoreManager.sales AS s
     INNER JOIN StoreManager.sales_products AS sp
     ON s.id = sp.sale_id
     WHERE sp.sale_id = ?;`,
    [id],
  );
  return result;
};


module.exports = {
  findById,
  insertSale,
  selectMaxIndex,
  findAll,
  findById2,
};
