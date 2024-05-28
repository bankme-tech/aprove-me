export function getAssignorSeed({ date }: { date: Date }) {
  return [
    {
      id: '1',
      name: 'Jane Doe',
      document: '12345678000100',
      email: 'jane.doe@email.com',
      phone: '5579999999999',
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    },
    {
      id: '2',
      name: 'John Doe',
      document: '12345678000100',
      email: 'john.doe@email.com',
      phone: '5579999999999',
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    },
  ];
}

export function getPayableSeed({ date }: { date: Date }) {
  return [
    {
      id: '1',
      value: 130,
      emissionDate: new Date('2024-05-21'),
      assignorId: '1',
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    },
    {
      id: '2',
      value: 170,
      emissionDate: new Date('2024-05-22'),
      assignorId: '1',
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    },
    {
      id: '3',
      value: 100,
      emissionDate: new Date('2024-05-23'),
      assignorId: '2',
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    },
  ];
}

export function getUsersSeed({ date }: { date: Date }) {
  return [
    {
      id: '1',
      login: 'aprovame',
      password: 'aprovame',
      createdAt: date,
      updatedAt: date,
      deletedAt: null,
    },
  ];
}
