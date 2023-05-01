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
  it('se é retornado um status 200 e um objeto no app.get da /sales', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {};


    sinon.stub(salesServices, 'findAll').resolves({ type: null, message: [
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 3,
    "quantity": 15
  }
]});
    
    await salesControllers.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(
  [
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 3,
    "quantity": 15
  }
      ] 
  );
  });
  it('se é retornado um status 404 e uma mensagem de erro caso a venda não seja encontrada', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: {id: 1}
    };


    sinon.stub(salesServices, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: null });
    
    await salesControllers.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
   it('se é retornado um status 404 e uma mensagem de erro caso a venda não seja encontrada', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: {id: 1}
    };


    sinon.stub(salesServices, 'findById').resolves({ type: null, message: salesMock.mockfindById2 });
    
    await salesControllers.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.mockfindById2);
   });
   it('se é retornado um status 200 e um objeto no app.get da /sales', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {};


    sinon.stub(salesServices, 'findAll').resolves({ type: null, message: [
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 3,
    "quantity": 15
  }
]});
    
    await salesControllers.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(
  [
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-04-30T21:51:44.000Z",
    "productId": 3,
    "quantity": 15
  }
      ] 
  );
  });
  it('se é retornado um status 404 e uma mensagem de erro caso a venda não seja encontrada', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: {id: 1}
    };


    sinon.stub(salesServices, 'findById').resolves({ type: 'SALE_NOT_FOUND', message: null });
    
    await salesControllers.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });
   it('se é retornado um status 200 e um objeto com a venda encontrada', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: {id: 1}
    };


    sinon.stub(salesServices, 'findById').resolves({ type: null, message: salesMock.mockfindById2 });
    
    await salesControllers.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock.mockfindById2);
   });
    it('se é retornado um status 404 e uma mensagem de erro caso a venda a ser deletada não seja encontrada', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    const req = {
      params: {id: 99}
    };


    sinon.stub(salesServices, 'deleteSale').resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
    
    await salesControllers.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
   });
    afterEach(function () {
    sinon.restore();
    });
     it('se é retornado um status 204 com a deleção da venda', async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.send = sinon.stub().returns();
    const req = {
      params: {id: 1}
    };


    sinon.stub(salesServices, 'deleteSale').resolves({ type: null, message: 'ok' });
    
    await salesControllers.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
   });
})