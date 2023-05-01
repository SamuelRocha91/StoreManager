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
describe('Verifica na rota /products pelo método POST', function () {
  it('se a função insertProduct consegue inserir um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 4}]);
    const result = await productsModel.insertProduct('Samuel');
    expect(result).to.be.deep.equal(4);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});

describe('Verifica na rota /products pelo método PUT', function () {
  it('se a função updateProduct consegue inserir um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([
  {
    date: '2023-05-01T11:51:21.000Z',
    productId: 1,
    quantity: 5
  },
  {
    date: '2023-05-01T11:51:21.000Z',
    productId: 2,
    quantity: 10
  }
]);
    const result = await productsModel.updateProduct(1, 'Thor');
    expect(result).to.be.deep.equal([
  {
    date: '2023-05-01T11:51:21.000Z',
    productId: 1,
    quantity: 5
  },
  {
    date: '2023-05-01T11:51:21.000Z',
    productId: 2,
    quantity: 10
  }
]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});

describe('Verifica na rota /products/:id pelo método DELETE', function () {
  it('se a função deleteProduct consegue deletar um produto', async function () {
    sinon.stub(connection, 'execute').resolves([
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]);
    const result = await productsModel.deleteProduct(1);
    expect(result).to.be.deep.equal([
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
  undefined
]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
