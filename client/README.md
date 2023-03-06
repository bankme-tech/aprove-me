<h1 align="center">
  Aprova-me (Frontend)
</h1>

</br>
<h2> 🧑🏽‍💻 Documentação Complementar</h2>
<p>Abaixo pode ser verificado o raciocínio para criar o layout/telas + consumo de api do frontend.</p>

</br> 

<strong>Desenvolvi o frontend utilizando Next.js + Typescript, Taliwind CSS e Chakra UI. </strong>
[Necessário Node v16.8.0 ou superior] 

## Parte 1 - Construindo as interfaces de autenticação. </br> 

A princípio iria utilizar React, mas quando fui utilizar o react-router acabei comparando com o roteamento do Next.js e observando grandes vantagens, não só no roteamento (com as rotas baseadas nos arquivos), como pelo fato de poder adotar SSR. Portanto, resolvi utilizar o Next.js para obter, também, uma boa performance e por consquência boa experiência do usuário. </br> 

Comecei definindo quais seriam as formas de estilizar meu site de forma rápida e eficaz. Por isso escolhi utilizar os components do ChakraUI juntamente com a estilização do Tailwind CSS. </br> 

</br> 

<strong>Next Auth</strong> </br> 
Escolhi essa biblioteca para construir um eficiente sistema de Autenticação no frontend no lado do servidor (SSR), visto que essa lib irá cuidar da abstração da autenticação, com diversas funcionalidades de segurança nativas, além de ser simples de implementar. </br>

Agora crio e configuro meu provider de credenciais. </br>

Em seguida adiciono o SessionProvider no root (app.tsx) para validar a autenticação de um user, bem como obter suas informações após o login. </br>

Por fim crio o layout de autenticação (utilizando Formik para o form) e consumo a função de login através do provider. </br>

Para finalizar o processo de autenticação apenas utilizo um validador de sessão (no lado do servidor) para redirecionar os usuários logados automaticamente para a page "home", bem como redirecionar usuários não autenticados para tela de login (protegendo a aplicação com rotas privadas). </br>

</br>

## Parte 2 - Construindo o CRUD (payable e assignor). </br> 

Utilizei TailwindCSS para fazer o desenvolvimento do grid e modal.


## Parte 2.1 - Consumo de API. </br> 

Utilizei a lib Axios.
