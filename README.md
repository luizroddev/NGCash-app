# NG.CASH

## Desafio:

Estruturar uma aplicação web _fullstack_, **_dockerizada_**, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

## Instalação do projeto Backend

Primeiro baixe o projeto ou clone usando a ferramenta do GitHub

```bash
  git clone https://github.com/luizroddev/NGCash-app.git
  cd NGCash-app
```

Primeiro iremos configurar a parte do Back-End da nossa aplicação, acesse a pasta do BackEnd

```bash
  cd Backend
```

Após a clonagem do projeto, instale as dependências necessárias
estando dentro da pasta Backend do projeto, execute o comando:

```bash
  npm install
```

Após a instalação de todas as dependências da aplicação, iremos
organizar nosso ambiente Docker, onde o nosso banco de dados
PostgreSQL será administrado.

Caso não tenha o Docker ainda no seu computador, você pode baixar ele no link a seguir:
[Clique aqui para fazer o download do Docker](https://www.docker.com/products/docker-desktop/)

Após a instalação do ambiente Docker, volte a pasta do projeto e execute o comando:

```bash
  docker compose up -d
```

Esse comando irá fazer o download de todas as imagens necessárias para rodar o PostgreSQL
e já começará a rodar logo em seguida

Após a instalação da imagem do Docker, vamos aplicar no nosso banco de dados, as migrações anteriormente feitas
para construir a base de tabelas e colunas do nosso banco, para isso use o comando:

```bash
  npm run migration:run
```

Após a execução das migrações concluídas, o projeto está pronto para ser iniciado, para isso use o comando:

```bash
  npm run dev
```

## Instalação do projeto Frontend

Após configurado a parte de Backend, volte para a pasta anterior e acesse a pasta Frontend

```bash
  cd ..
  cd Frontend
```

Instale as dependências necessárias
estando dentro da pasta Frontend do projeto, execute o comando:

```bash
  npm install
```

Após a instalação de todas as dependências da aplicação, a aplicação Frontend já está pronta para execução, para iniciar a aplicação, execute o comando:

```bash
  npm run dev
```

## Endereço das aplicações

O servidor Backend estará rodando no endereço [http://localhost:7777](http://localhost:7777)

A aplicação Frontend estará rodando no endereço [http://localhost:3000](http://localhost:3000)
