export const ReportBatchTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Relatório de Lote de Recebíveis</title>
</head>
<body>
    <h1>Relatório de Lote de Recebíveis</h1>
    <p>Prezado(a) Usuário(a),</p>
    <p>O processamento em lote dos seus recebíveis foi concluído. Aqui estão os detalhes:</p>
    <ul>
        <li>Total de Recebíveis Processados: {{data.total}}</li>
        <li>Recebíveis Processados com Sucesso: {{data.messageSuccess}}</li>
        <li>Recebíveis com Falha no Processamento: {{data.messageFailure}}</li>
    </ul>
    <p>Agradecemos por utilizar nosso serviço.</p>
    <p>Atenciosamente,</p>
    <p>Willer bank</p>
</body>
</html>
`;
