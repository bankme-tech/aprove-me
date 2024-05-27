// eslint-disable-next-line @typescript-eslint/no-var-requires
const autocannon = require('autocannon');

// Dados da requisição
const requestData = [
  { value: 123.45, assignorId: '047f2ffc-cd8b-42fe-9d08-0738bf7719df' },
  { value: 234.56, assignorId: '047f2ffc-cd8b-42fe-9d08-0738bf7719df' },
  { value: 234.56, assignorId: '047f2ffc-cd8b-42fe-9d08-0738bf7719df' },
];
const validToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMDUzNjI4Mi1iYTIwLTQxMjYtODljNC1iODcxMmViODU0YmYiLCJsb2dpbiI6ImZlcm9kZGV2IiwiaWF0IjoxNzE2Nzc0MDQ3LCJleHAiOjE3MTczNzg4NDd9.0YKcfVccCvwW5w7DUas_shfd5473Brk5yKshnmXMgqU';
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
