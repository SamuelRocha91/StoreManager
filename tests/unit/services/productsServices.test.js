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
});