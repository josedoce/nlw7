# Criando seila o que

## ferramentas e tecnologias
### Prisma orm
**Novo**: conhecendo o **prisma orm**<br>
site: https://www.prisma.io/<br>
duvida: será melhor que o sequelize ? :-;<br>
instalar: `$ yarn add prisma -D`<br>
**usando**
  #### - formas para invocar o prisma: 
  1- usando o `$ yarn prisma`

  2- utilizando a propria biblioteca usando o `$ yarn prisma init`

  O que acontece: Ele cria um .env e uma pasta com o nome 'prisma', é nessa pasta que conterá configurações de conexão e etc...

  ### github oAuth
  site: https://github.com/settings/developers

  #### - formas de configurar o oAuth
  1- crie o nome da sua aplicação - isso será usado tanto no web quanto no mobile

  2- defina o host full da sua aplicação

  3- O link de callback, esse link será usado pelo oAuth para enviar os dados de authenticação de usuário para uma rota da nossa api...

  4- Depois crie uma client secret

  5- Copie o client_id e client_secret para o .env e tudo ok ate aqui...

  6- Crie uma rota que faça um redirect para : https://github.com/login/oauth/authorize?client_id=env **Obs:** para usar o .env, tem que usar o pacote dotenv, instale assim: `$ yarn add dotenv`