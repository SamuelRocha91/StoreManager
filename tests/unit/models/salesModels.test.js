const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const salesMock = require('./mocks/sales.model.mock');
const salesModel = require('../../../src/models/sales.models');

describe('Verifica se na rota "/sales" e camada models', function () {
  it('se é possível encontrar um produto que está cadastrado através da função findById', async function () {
    sinon.stub(connection, 'execute').resolves([[salesMock.mockFindById]]);
    
    const result = await salesModel.findById(1)

    expect(result).to.be.deep.equal(salesMock.mockFindById);
  });
  it('se não se retorna um produto quando ele não está cadastrado', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);
    
    const result = await salesModel.findById(7)

    expect(result).to.be.deep.equal(undefined);
  });
  it('se é possível selecionar o maior índice presente na tabela sales', async function () {
    sinon.stub(connection, 'execute').resolves([[salesMock.mockSelectMaxIndex]]);
    
    const result = await salesModel.selectMaxIndex();

    expect(result.index).to.be.deep.equal(3);
  });
    it('se é possível selecionar o maior índice presente na tabela sales', async function () {
    sinon.stub(connection, 'execute').resolves([[salesMock.mockSelectMaxIndex]]);
    
    const result = await salesModel.selectMaxIndex();

    expect(result.index).to.be.deep.equal(3);
    });
    it('se a função insertSale retorna true quando cria uma nova venda', async function () {
    sinon.stub(connection, 'execute').resolves([[true]]);
    
    const result = await salesModel.insertSale(salesMock.insertSale);

    expect(result).to.be.deep.equal(true);
    });
  it('se a função findAll retorna um objeto com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.mockFindAll]);
    
     const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(salesMock.mockFindAll);
   });
   it('se a função findByID2 retorna um objeto com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.mockfindById2]);
    
     const result = await salesModel.findById2(1);

    expect(result).to.be.deep.equal(salesMock.mockfindById2);
  });
   it('se a função findAll retorna um objeto com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.mockFindAll]);
    
     const result = await salesModel.findAll();

    expect(result).to.be.deep.equal(salesMock.mockFindAll);
   });
   it('se a função findByID2 retorna um objeto com todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock.mockfindById2]);
    
     const result = await salesModel.findById2(1);

    expect(result).to.be.deep.equal(salesMock.mockfindById2);
   });
   it('se a função findByIDSale consegue encontrar uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 2, date: '2023-05-01T14:59:15.000Z' }]]);
    
     const result = await salesModel.findByIdSale(2);

    expect(result).to.be.deep.equal({ id: 2, date: '2023-05-01T14:59:15.000Z' });
   });
  
    it('se a função deleteSale consegue deletar uma venda pelo id', async function () {
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
    
     const result = await salesModel.deleteSale(1);
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
})