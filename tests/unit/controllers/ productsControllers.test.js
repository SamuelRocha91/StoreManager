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


    sinon.stub(productsService, 'allProducts').resolves({ type: null, message: products });
    await productsControllers.listProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
  it('se, uma vez feita uma requisição com um id válido, a função getProducts retorna o status 200 e no json o objeto específico do id pesquisado', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = { params: { id: 1 } };


    sinon.stub(productsService, 'productsById').resolves({ type: null, message: products[0] });
    await productsControllers.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });
  it('se, uma vez feita uma requisição com um id inválido, a função getProducts retorna o status 404 e no json a mensagem "Product not found"', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = { params: { id: 4 } };


    sinon.stub(productsService, 'productsById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
    await productsControllers.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
    it('verifica se ao fazer uma requisição com o nome correto se é retornado um objeto de confirmação', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      body: {name: 'xablau'}
    };
    sinon.stub(productsService, 'createProduct').resolves({ type: null, message: {id: 4, name: 'xablau' } });

    await productsControllers.create(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({id: 4, name: 'xablau' } );
    })
   it('verifica se ao fazer uma atualização com um produto incorreto se é retornado um objeto de erro', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: { id: 999 },
      body: {name: 'thor'}
    };
    sinon.stub(productsService, 'updateProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsControllers.update(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'} );
   })
  it('verifica se ao fazer uma atualização com um produto correto se é retornado um objeto', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: { id: 1 },
      body: { name: 'thor' }
    };
    sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: { id: 1, name: 'thor' } });

    await productsControllers.update(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'thor' });
  });
  it('verifica se ao fazer um DELETE com um id incorreto se é retornado um status de erro', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: { id: 5 },
    };
    sinon.stub(productsService, 'deleteProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsControllers.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('verifica se ao fazer um DELETE com um id correto se é retornado um status 204', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();
    const req = {
      params: {
        id: 1
      },
    };
    sinon.stub(productsService, 'deleteProduct').resolves({ type: null, message: 'ok' });

    await productsControllers.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
  
  });
  afterEach(function () {
    sinon.restore();
  });
});
