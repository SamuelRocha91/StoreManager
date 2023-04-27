const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const products = require('./mocks/products.model.mock');
const productsModel = require('../../../src/models/products.model');

describe('Verifica na rota /products na camada models', function () {
  it('uma vez feita uma requisição, retornada uma lista de produtos do banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(products);
  });
  afterEach(function () {
    sinon.restore();
  });
});
describe('Verifica na rota /products/:id na camada models', function () {
  it('se uma vez feita uma requisição com um id válido, é retornado o produto selecionado', async function () {
    sinon.stub(connection, 'execute').resolves([[products[0]]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(products[0]);
  });
  afterEach(function () {
    sinon.restore();
  });
});
