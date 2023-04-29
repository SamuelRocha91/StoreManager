const { expect } = require('chai');
const sinon = require('sinon');
const salesMock = require('../../unit/models/mocks/sales.model.mock');
const salesServices = require('../../../src/services/sales.services');
const salesControllers = require('../../../src/controllers/sales.controllers');


describe('Verifica se na rota "/sales" na camada controllers', function () {
  it('se é retornado um status 422 para uma requisição com o campo quantity inválido', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      body: 
        [{ productId: 1, quantity: -1 }]
    };


    sinon.stub(salesServices, 'createSale').resolves({ type: 'QUANTITY_INVALID', message: '"quantity" must be greater than or equal to 1' });
    
    await salesControllers.create(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });

  });
   it('se é retornado um status 404 para uma requisição com o campo productID inexistente', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      body: 
       [ { productId: 1, quantity: 1 },
         { productId: 99999, quantity: 5 },
       ]
    };


    sinon.stub(salesServices, 'createSale').resolves({ type: 'INVALID_VALUE', message: 'Product not found'});
    
    await salesControllers.create(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
   });
   it('se é retornado um status 201 para uma requisição de cadastro feita corretamente', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      body: 
       [
    {
    "productId": 1,
    "quantity": 1
    },
    {
    "productId": 2,
    "quantity": 5
    }
       ]
    };


    sinon.stub(salesServices, 'createSale').resolves({ type: null, message: { id: 3, itemsSold: [
    {
    "productId": 1,
    "quantity": 1
    },
    {
    "productId": 2,
    "quantity": 5
    }
       ]}});
    
    await salesControllers.create(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({
  id: 3,
  itemsSold: [ { productId: 1, quantity: 1 }, { productId: 2, quantity: 5 } ]
});
   });
    afterEach(function () {
    sinon.restore();
  });
})