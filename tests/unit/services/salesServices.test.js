const { expect } = require('chai');
const sinon = require('sinon');
const salesMock = require('../models/mocks/sales.model.mock');
const salesModel = require('../../../src/models/sales.models');
const salesServices = require('../../../src/services/sales.services');


describe('Verifica na camada services da rota "sales"', function () {
  it('Caso seja passado um array com o campo quantity menor do que zero se é retornado um erro', async function () {
    const result = await salesServices.createSale(salesMock.wrongZeroNegativeBody)

    expect(result).to.be.deep.equal({ type: 'QUANTITY_INVALID', message: '"quantity" must be greater than or equal to 1' });
  })
   it('Caso seja passado um array com o campo quantity igual a zero se é retornado um erro ', async function () {
     const result = await salesServices.createSale(salesMock.wrongZeroQuantityBody)

     expect(result).to.be.deep.equal({ type: 'QUANTITY_INVALID', message: '"quantity" must be greater than or equal to 1' });
   })
   it('Caso seja passado um array em que um dos elementos não seja cadastrado, se é retornado um objeto de erro', async function () {
    sinon.stub(salesServices, 'findProducts').resolves(1);
    
    const result = await salesServices.createSale(salesMock.nonexistentProductIdBody2);

    expect(result).to.be.deep.equal({ type: 'INVALID_VALUE', message: 'Product not found' });
   })
  it('Caso seja passado um objeto que siga todas as normas, se é retornado um objeto correto', async function () {
    sinon.stub(salesServices, 'findProducts').resolves(2);
    sinon.stub(salesModel, 'insertSale').resolves(true);
    sinon.stub(salesModel, 'selectMaxIndex').resolves({ index: 2 });

    const result = await salesServices.createSale(salesMock.insertSale);
     
    expect(result).to.be.deep.equal({
      type: null, message: { id: 2, itemsSold: salesMock.insertSale },
    });
  });
    afterEach(function () {
    sinon.restore();
  });
})