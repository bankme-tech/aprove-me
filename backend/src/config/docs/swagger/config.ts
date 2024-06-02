export interface SwaggerConfig {
  title: string;
  description: string;
  version: string;
  tags?: string[];
}

export const SWAGGER_CONFIG: SwaggerConfig = {
  title: 'Api-aprovame',
  description: `
    Esta API fornece endpoints para autenticação, registro de usuários, operações CRUD para 
    cedentes e gerenciamento de recebíveis.
    
    Autenticação:
    - Utilize o endpoint fornecido para autenticar usuários e obter um token de acesso (bearer token) para acessar rotas protegidas.
    
    Registro de Usuários:
    - Registre novos usuários no sistema fornecendo credenciais de usuário, incluindo login e senha.
    
    CRUD de Assignors:
    - Realize operações CRUD (Criar, Ler, Atualizar, Deletar) em registros de cedentes para gerenciar informações de cedentes.
    
    Gerenciamento de Payables:
    - Gerencie recebíveis, incluindo criação, recuperação, atualização e exclusão de registros de payables.
    
    O acesso a determinados endpoints pode exigir autenticação via token de acesso, obtido por meio do processo de autenticação.
  `,
  version: '1.0',
  tags: ['auth', 'payable', 'assignor'],
};
