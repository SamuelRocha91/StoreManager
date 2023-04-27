const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');

const sinonChai = require('sinon-chai');
chai.use(sinonChai);


const products = require('../models/mocks/products.model.mock');
const productsService = require('../../../src/services/products.services');
const productsControllers = require('../../../src/controllers/products.controllers');

describe('Verifica na camada controllers', function () {
  it('se, uma vez feita uma requisição, a função productsControllers retorna o status 200 e no json um array de objetos', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {};


    sinon.stub(productsService, 'allProducts').resolves({type: null, message: products});
    await productsControllers.listProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
   it('se, uma vez feita uma requisição com um id válido, a função getProducts retorna o status 200 e no json o objeto específico do id pesquisado', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
     const req = { params: { id: 1 } };


    sinon.stub(productsService, 'productsById').resolves({type: null, message: products[0]});
    await productsControllers.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
   });
    it('se, uma vez feita uma requisição com um id inválido, a função getProducts retorna o status 404 e no json a mensagem "Product not found"', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
     const req = { params: { id: 4 } };


    sinon.stub(productsService, 'productsById').resolves({type: 'PRODUCT_NOT_FOUND', message: 'Product not found'});
    await productsControllers.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
   afterEach(function () {
        sinon.restore();
      });
})