const salesServices = require('../services/sales.services');

const create = async (req, res) => {
  const array = req.body;
  const { type, message } = await salesServices.createSale(array);
  
  if (type === 'QUANTITY_INVALID') {
    return res.status(422).json({ message });
  }
  if (type === 'INVALID_VALUE') {
    return res.status(404).json({ message });
  }
  return res.status(201).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await salesServices.findAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findById(id);
  if (type) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(message);
};

module.exports = {
  create,
  findAll, 
  findById,
};

// Se a requisição tiver algum item cujo campo productId não existe no banco de dados, o resultado retornado deverá ser conforme exibido abaixo, com um status http 404