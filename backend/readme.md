# Bank-me - O Desafio de código

Este projeto foi criado como parte de um desafio. Esta documentação contempla apenas o back-end da aplicação. Para executa-la realize os passos abaixo deste documentação


## Pré-requisitos:

- Docker
- WSL2 (recomendado) (onde a aplicação foi testada)

## Configuração e Instalação

1. **Clone o repositório**

2. **Construa e inicie os contêineres Docker**

Execute o seguinte comando para construir e iniciar os contêineres:

```bash
docker-compose build
```


```bash
docker-compose up --remove-orphans --build
```

OBS: ambos os parametros "build" e "remove-orphans" são opcionais, coloque-os caso você tenha cometido algum erro no build e precise montar a imagem novamente.

Se ainda assim você encontrar problemas, pode ser que haja uma incompatibilidade entre o arquivo `docker-compose.yaml` e a versão do Docker instalada em seu sistema. É possível que o problema esteja na versão do Docker que você possui. Caso encontre algum erro, você tem a opção de alterar a versão especificada no arquivo para a versão que é suportada pela sua instalação do Docker. Isso pode ser feito modificando o parâmetro 'version' no arquivo docker-compose. Por exemplo:

```
version: 3.3
services:
  app_python:
    image: python:3.8.10
    volumes:
      - ./src/api:/app
[...]
```

1. **Acesse a aplicação**

Depois que os contêineres estiverem em execução e as aplicações inicializadas, você pode acessar a aplicação:
- [http://localhost:5173](http://localhost:5173)
- Se você estiver rodando o projeto em um ambiente WSL, pode ser necessário substituir "localhost" pelo endereço IPv4 da sua máquina WSL. Para descobrir isso, abra o prompt de comando ou o PowerShell e digite `ifconfig` para obter o IPv4 da interface de rede.

exemplo de resposta:
```bash
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.30.11.85  netmask 255.255.240.0  broadcast 172.30.15.255
        inet6 fe80::215:5dff:fef2:d288  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:f2:d2:88  txqueuelen 1000  (Ethernet)
        RX packets 519559  bytes 58424565 (58.4 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 15446  bytes 3243315 (3.2 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 315643  bytes 327217095 (327.2 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 315643  bytes 327217095 (327.2 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

sendo o endereço IPV4 o endereço presente após a palavra "inet".

## Executando testes

Para rodar os testes da aplicação, após iniciar o docker e as aplicações, execute o seguinte comando: 

```bash
docker exec -it <container-id> npm run test
```
- substituindo `<container-id>` pelo ID do container node
- Você pode encontrar o ID do contêiner usando o comando `docker ps`. Outra alternativa é substituir `<container-id>` pelo nome do processo docker.

```bash
docker exec -it <nome do projeto> npm run test
```