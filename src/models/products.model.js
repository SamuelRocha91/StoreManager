const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const searchByName = async (name) => {
   const [[result]] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE name LIKE '%${name}%'`,
   );
  return result;
};

const findById = async (productsId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productsId],
  );
  return result;
};

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [name],
  );
  return insertId;
};

const updateProduct = async (productID, name) => {
  const result = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, productID],
  );
  return result;
};

const deleteProduct = async (id) => {
  const result = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?;',
    [id],
  );   
  return result;
};

module.exports = {
  findById,
  findAll,
  insertProduct,
  updateProduct,
  deleteProduct,
  searchByName,
};