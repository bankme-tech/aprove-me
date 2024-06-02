// import autocannon, { track } from 'autocannon';
const autocannon = require('autocannon');

// Dados da requisição
const requestData = [
  {
    value: 123.45,
    emissionDate: '02/04/2024',
    assignorId: '9fe7de00-6f6c-45e2-8dfe-737f945614ef',
  },
  {
    value: 234.56,
    emissionDate: '02/04/2024',
    assignorId: '9fe7de00-6f6c-45e2-8dfe-737f945614ef',
  },
  {
    value: 234.56,
    emissionDate: '02/04/2024',
    assignorId: '9fe7de00-6f6c-45e2-8dfe-737f945614ef',
  },
];
const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbWFpbEBlbWFpbC5jb20iLCJ1c2VybmFtZSI6IkZ1bGFubyIsImlhdCI6MTcxNzM2MTMyOCwiZXhwIjoxNzE3NDQ3NzI4fQ.gtnBKpNJ2wE6Mgc6kA03qVNgBFsvkZioH0VQt6rJUSQ';
// Configurações do Autocannon
const options = {
  url: 'http://localhost:3000/integrations/payable/batch',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${validToken}`,
  },
  // Convertendo os dados em JSON antes de enviar
  body: JSON.stringify(requestData),
  // Número de requisições a serem feitas
  connections: 10_000,
  // O que fazer quando a requisição for bem-sucedida
  onResponse: (status) => {
    console.log(`Requisição bem-sucedida: ${status}`);
  },
  // O que fazer em caso de erro
  onError: (error) => {
    console.error('Erro na requisição:', error);
  },
};

// Iniciando o teste com Autocannon
const instance = autocannon(options);

// Tratamento para quando o teste é concluído
autocannon.track(instance, { duration: 60 }, (error, result) => {
  if (error) {
    console.error('Erro ao rastrear o teste:', error);
  } else {
    console.log('Resultados do teste:', result);
  }
});
