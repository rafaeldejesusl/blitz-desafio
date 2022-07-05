# blitz-desafio

Esse repositório contém uma aplicação desenvolvida para o desafio da Blitz de Carreiras na Trybe. É formado por um banco de dados MySQL, um back end desenvolvido em TypeScript com Express e um front end desenvolvido em React.

---

## Instalação

Inicialmente, abra o terminal e cole o seguinte código para clonar o repositório em sua máquina:

```
git clone git@github.com:rafaeldejesusl/blitz-desafio.git
```

Após clonado, entre na pasta do projeto:

```
cd blitz-desafio
```

Na pasta raiz do projeto, inicie a criação do contâineres e espere até que o processo esteja finalizado e a aplicação esteja rodando:

```
docker-compose up --build
```

Após isso, a aplicação pode ser aberta no navegador através do seguinte endereço:

```
http://localhost:3000/
```

**⚠ OBS: O processo de iniciação pode ser demorado, espere até sua conclusão para evitar erros.**

---

## Organização das Pastas

```tree
├─ ...
├─ backend
│   └─ tests
│   └─ src
|       ├─ controllers
|       ├─ services
|       ├─ models
|       ├─ middlewares
|       ├─ routes
|       └─ interfaces
├─ frontend
│   └─ public
│   └─ src
|       ├─ components
|       └─ context
└─ ...
```
---

## Banco de Dados

O banco de dados roda num contâiner criado a partir da imagem do mysql:5.7. O nome do banco é Ebytr, e contém uma única tabela chamada Tasks, formado pelos campos:

* "id" gerado automaticamente;

* "name" que recebe uma string;

* "createdAt" que recebe uma data;

* "status" que recebe uma string.

---

## Back End

O back end roda num contâiner criado a partir do Dockerfile na pasta "backend", e realiza as operações de CRUD das tarefas do banco de dados, ou seja, através dele é possível listar, criar, apagar e atualizar. As rotas disponíveis são:

* Método GET `/tasks`, retorna lista de tarefas;

* Método POST `/tasks`, enviando um name e status para criar uma tarefa;

* Método PUT `/tasks/:id`, enviando um novo status para atualizar a tarefa;

* Método DELETE `/tasks/:id`, para apagar determinada tarefa;

---

## Front End

O front end roda num contâiner criado a partir do Dockerfile na pasta "frontend", e consiste numa página com um formulário que recebe o nome e o status da tarefa e um botão para criar a tarefa. Existe uma tabela que mostra as tarefas já criadas, com as opções de editar e remover. Além disso, é possível filtrar através do cabeçário da tabela, podendo ser ordenada por nome, data de criação e status.

---

## Testes

Os testes de integração do back end têm cobertura de 100%, e os testes de front end tem uma cobertura de 83,33%. Para rodá-los, é preciso interromper a aplicação. Após realizar os testes de front end, é recomendado restaurar o banco de dados para evitar erros. Os testes de front foram realizados com Jest e os de back com Mocha e Chai;

---

## Estilização

Para estilização do projeto, foi utilizado o framework Bootstrap;

---

## Feedbacks

Caso tenha alguma sugestão ou tenha encontrado algum erro no código, estou disponível para contato no meu [LinkedIn](https://www.linkedin.com/in/rafael-de-jesus-lima/)
