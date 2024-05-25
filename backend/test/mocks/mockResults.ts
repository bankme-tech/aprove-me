export const assignorServiceFindAll = [
  {
    id: '1',
    document: '000.000.000.14',
    email: 'teste@email.com',
    phone: '(75) 9 9921-4100',
    name: 'teste da Silva',
    password: 'hashedPassword',
  },
  {
    id: '2',
    document: '000.000.000.18',
    email: 'email@email.com',
    phone: '(75) 9 9921-4100',
    name: 'Teste dos Santos',
    password: 'hashedPassword',
  },
];

export const assignorServiceFindById = {
  id: '2',
  document: '000.000.000.18',
  email: 'email@email.com',
  phone: '(75) 9 9921-4100',
  name: 'Teste dos Santos',
  password: 'hashedPassword',
};

export const assignorServiceCreated = {
  id: '3',
  document: '000.000.000.72',
  email: 'testezin@email.com',
  phone: '(75) 9 9921-0000',
  name: 'Teste dos Souza',
  password: 'hashedPassword',
};

export const createdDtoAssignor = {
  document: '000.000.000.72',
  email: 'testezin@email.com',
  phone: '(75) 9 9921-0000',
  name: 'Teste dos Souza',
  password: 'hashedPassword',
};

export const updateDtoAssignor = {
  document: '008.123.345.72',
  email: 'testezin@email.com',
};

export const assignorServiceUpdated = {
  id: '3',
  document: '008.123.345.72',
  email: 'testezin@email.com',
  phone: '(75) 9 9921-0000',
  name: 'Teste dos Souza',
  password: 'hashedPassword',
};

export const payableServiceFindAll = [
  {
    id: '1',
    value: 100,
    emissionDate: new Date('2023/10/02'),
    assignorId: '2',
  },
  {
    id: '2',
    value: 500,
    emissionDate: new Date('2023/11/02'),
    assignorId: '1',
  },
];

export const payableServiceFindById = {
  id: '2',
  value: 500,
  emissionDate: new Date('2023/11/02'),
  assignorId: '1',
};

export const payableServiceCreated = {
  id: '3',
  value: 10000,
  emissionDate: new Date('2023/11/02'),
  assignorId: '1',
};

export const createDtoPayable = {
  value: 10000,
  emissionDate: new Date('2023/11/02'),
  assignorId: '1',
};

export const updateDtoPayable = {
  value: 15000,
  emissionDate: new Date('2023/12/02'),
};

export const payableServiceUpdated = {
  id: '3',
  value: 15000,
  emissionDate: new Date('2023/12/02'),
  assignorId: '1',
};
