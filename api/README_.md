Nível 01: 

Iniciei o desafio criando os modelos no prisma, utilizei o SQLite como banco principal para os dados. Feito isso gerei a migration do mesmo. 

Logo após criei o esquema de CRUD com o npx nest generate resource.

Configurei o prisma client para poder fazer as queries no banco.

Gerei o de payable primeiro. Como estou usando o prisma apaguei a entidade gerada pelo comando pois já as defini no arquivo schema.prisma. Sobre as validaçoes gosto de utilizar a lib 'class-validator' com isso uso ela no DTO para fazer as vaidacoes. O create e outros métodos está na camada de service, nao vi a necessidade de um repository mas entendo que em projetos mais complexos ele é mais necessário devido a facilidade de emcapsulamento e abstracao para que o service nao precise lidar diretamente em como o banco esta implementado. 

Iniciei pelo endpoint: POST /integrations/payable

No body eu passei o ```create(@Body(ValidationPipe) createPayableDto: CreatePayableDto)``` para validar o Pipe e eu ter certeza que o parametro que defini vai ser passado corretamente, é algo que tenho adotado bastante em projetos pessoais. 

