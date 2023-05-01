const saleWithoutProductIdBody = [{ quantity: 1 }];
const saleWithoutQuantity = [{ productId: 1 }];
const saleWithoutProductIdExistent = [{ productId: 9999, quantity: 1 }];
const nonexistentProductIdBody2 = [
  { productId: 1, quantity: 1 },
  { productId: 99999, quantity: 5 },
];
const wrongZeroQuantityBody = [{productId:1,quantity: 0}];
const wrongZeroNegativeBody = [{productId:1,quantity:-1}];
const otherProductIdSaleBody = [
  {productId:1,quantity:1},
  {productId:3,quantity:5},
];
const correctSaleBody = [
  {productId:1,quantity:1},
  {productId:2,quantity:5},
];
const responseCorrect = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ]
};

const mockFindById = { id: 1, name: 'Martelo de Thor' }

const mockSelectMaxIndex = { index: 3 }

const insertSale = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const mockFindAll = [
   {
    saleId: 1,
    date: '2023-04-30T21:51:44.000Z',
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: '2023-04-30T21:51:44.000Z',
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date: '2023-04-30T21:51:44.000Z',
    productId: 3,
    quantity: 15
  }
]

const mockfindById2= [
  {
    date: '2023-04-30 21:51:44.000',
    productId: 1,
    quantity: 5
  },
  {
    date: '2023-04-30 21:51:44.000',
    productId: 2,
    quantity: 10
  }
]

module.exports = {
  saleWithoutProductIdBody,
  saleWithoutQuantity,
  saleWithoutProductIdExistent,
  nonexistentProductIdBody2,
  wrongZeroQuantityBody,
  wrongZeroNegativeBody,
  otherProductIdSaleBody,
  correctSaleBody,
  responseCorrect,
  mockFindById,
  mockSelectMaxIndex,
  insertSale,
  mockFindAll,
  mockfindById2,
}