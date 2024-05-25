import * as fs from 'fs';
import * as path from 'path';

// Função para gerar uma data aleatória entre um intervalo de anos
function getRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Função para gerar um valor aleatório
function getRandomValue() {
  return parseFloat((Math.random() * 10000).toFixed(2));
}

const records = [];

for (let i = 0; i < 10000; i++) {
  records.push({
    value: getRandomValue(),
    emissionDate: getRandomDate(new Date(2022, 0, 1), new Date()).toISOString(),
    assignorId: '6464e7f3-39d1-45a3-971c-9e340942b302',
  });
}

fs.writeFile(
  path.resolve('..', 'assets', 'payables.json'),
  JSON.stringify(records, null, 2),
  (err) => {
    if (err) throw err;
    console.log('Arquivo payables.json foi criado com sucesso!');
  },
);
