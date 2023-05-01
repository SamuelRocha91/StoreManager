const { expect } = require('chai');
const sinon = require('sinon');

const products = require('../models/mocks/products.model.mock');
const productsService = require('../../../src/services/products.services');
const productsModel = require('../../../src/models/products.model');

describe('Verifica na camada services', function () {
  it('se uma vez feita uma requisição, a função allProducts retorna um objeto com type null e uma mensagem com um array de produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(products);
    const result = await productsService.allProducts();
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products);
  });
    it('se uma vez feita uma requisição com um id inválido, a função productsById retorna um objeto com type PRODUCT_NOT_FOUND e uma mensagem "Product Not Found"', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.productsById(4);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal('Product not found');
    });
    it('se uma vez feita uma requisição com um id válido, a função productsById retorna um objeto com type null e uma mensagem com um array de resultado', async function () {
    sinon.stub(productsModel, 'findById').resolves(products[0]);
    const result = await productsService.productsById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(products[0]);
  });
   afterEach(function () {
        sinon.restore();
      });
})

describe('Verifica na camada services', function () {
  it('se, uma vez feita uma requisição POST para a rota /products, é possível se é retornado um objeto', async function () {
    sinon.stub(productsModel, 'insertProduct').resolves(4);
    sinon.stub(productsModel, 'findById').resolves({ id: 4, name: 'Samuel' });
    const result = await productsService.createProduct('Samuel');
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal({ id: 4, name: 'Samuel' });
  });
     afterEach(function () {
        sinon.restore();
      });
});


describe('Verifica na camada services', function () {
  it('se, uma vez feita uma requisição PUT para a rota /products/:id se é retornado um objeto de erro caso não exista produto com esse parâmetro', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.updateProduct(1, 'thor');
    expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });
    it('se, uma vez feita uma requisição PUT para a rota /products/:id se é retornado um objeto correto caso o produto seja existente', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.updateProduct(1, 'thor');
    expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });
     afterEach(function () {
        sinon.restore();
      });
});

describe('Verifica na camada services', function () {
  it('se, uma vez feita uma requisição PUT para a rota /products/:id se é retornado um objeto de erro caso não exista produto com esse parâmetro', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.updateProduct(1, 'thor');
    expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });
    it('se, uma vez feita uma requisição PUT para a rota /products/:id se é retornado um objeto correto caso o produto seja existente', async function () {
    sinon.stub(productsModel, 'findById').resolves([
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
      sinon.stub(productsModel, 'updateProduct').resolves({ type: null, message: { id: 1, name: 'Chapolin colorado' } });

    const result = await productsService.updateProduct(1, 'Chapolin colorado');
    expect(result).to.deep.equal({ type: null, message: { id: 1, name: 'Chapolin colorado' } });
  });
     afterEach(function () {
        sinon.restore();
      });
});