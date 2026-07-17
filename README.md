# 📦 Sistema de Controle de Estoque

Projeto desenvolvido para a disciplina **Projeto Integrador** da **Gran Faculdade**.

Este projeto consiste em uma aplicação **Full Stack** para gerenciamento de estoque, permitindo o cadastro de produtos, fornecedores e a associação entre eles. O sistema foi desenvolvido utilizando **Node.js**, **React** e **SQLite**, seguindo boas práticas de organização em camadas (MVC), validação de dados e consumo de API REST.

---

# 👨‍🎓 Autor

**Alecio Pereira de Souza**

Curso: Ciência da Computação

Disciplina: Projeto Integrador

Instituição:Gran Faculdade

GitHub: https://github.com/apksouza

Repositório do projeto:

https://github.com/apksouza/projeto-integrador

---

# 📖 Objetivo

Desenvolver um sistema completo de controle de estoque capaz de:

- cadastrar produtos;
- cadastrar fornecedores;
- associar fornecedores aos produtos;
- editar registros;
- excluir registros;
- realizar pesquisas;
- validar informações inseridas pelo usuário;
- disponibilizar uma API REST para integração entre frontend e backend.

---

# 🚀 Tecnologias Utilizadas

## Backend

- Node.js
- Express.js
- SQLite
- CORS

## Frontend

- React
- Axios
- CSS3

## Ferramentas

- Visual Studio Code
- Git
- GitHub
- Insomnia

---

# 📂 Estrutura do Projeto

```
ProjetoIntegrador/

│
├── backend/
│
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── estoque.sqlite
│
├── frontend/
│
│   ├── src/
│   │
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── App.css
│
└── README.md
```

---

# 🗄 Banco de Dados

O sistema utiliza o banco de dados **SQLite**.

Foram implementadas três tabelas:

- produtos
- fornecedores
- produto_fornecedor

A tabela **produto_fornecedor** representa um relacionamento do tipo **muitos para muitos**.

---

# ⚙ Funcionalidades Implementadas

## 📦 Produtos

✔ Cadastro

✔ Listagem

✔ Busca por ID

✔ Atualização

✔ Exclusão

✔ Código de barras único

✔ Validação de campos obrigatórios

✔ Validação para aceitar apenas números no código de barras

---

## 🏢 Fornecedores

✔ Cadastro

✔ Listagem

✔ Busca por ID

✔ Atualização

✔ Exclusão

✔ CNPJ único

✔ Validação de CNPJ

✔ Validação de telefone

✔ Validação de e-mail

---

## 🤝 Associação Produto x Fornecedor

✔ Associar fornecedor ao produto

✔ Desassociar fornecedor

✔ Consultar associações

✔ Pesquisa inteligente

✔ Bloqueio de associação duplicada

---

# 🎨 Interface

O frontend foi desenvolvido em React utilizando uma interface moderna composta por:

- Menu lateral
- Dashboard inicial
- Cards com estatísticas
- Formulários organizados
- Tabelas responsivas
- Pesquisa inteligente
- Layout moderno
- Interface responsiva

---

# ▶ Como Executar o Projeto

## Pré-requisitos

É necessário possuir instalado:

- Node.js
- npm
- Git
- Visual Studio Code

Opcionalmente:

- Insomnia
- Postman

---

## 1 - Clonar o Projeto

```bash
git clone https://github.com/apksouza/projeto-integrador.git
```

Entrar na pasta:

```bash
cd projeto-integrador
```

---

# Backend

Entrar na pasta:

```bash
cd backend
```

Instalar dependências:

```bash
npm install
```

Criar as tabelas do banco:

```bash
node database/tabelas.js
```

Popular o banco com dados de demonstração:

```bash
node database/seed.js
```

Iniciar o servidor:

```bash
npm start
```

Servidor disponível em:

```
http://localhost:3000
```

---

# Frontend

Abrir um novo terminal.

Entrar na pasta:

```bash
cd frontend
```

Instalar dependências:

```bash
npm install
```

Executar:

```bash
npm start
```

Aplicação disponível em:

```
http://localhost:3001
```

Caso o React utilize outra porta, basta aceitar a sugestão apresentada no terminal.

---

# 📡 Endpoints da API

## Produtos

| Método | Endpoint |
|---------|----------|
| GET | /produtos |
| GET | /produtos/:id |
| POST | /produtos |
| PUT | /produtos/:id |
| DELETE | /produtos/:id |

---

## Fornecedores

| Método | Endpoint |
|---------|----------|
| GET | /fornecedores |
| GET | /fornecedores/:id |
| POST | /fornecedores |
| PUT | /fornecedores/:id |
| DELETE | /fornecedores/:id |

---

## Associações

| Método | Endpoint |
|---------|----------|
| GET | /associacoes |
| POST | /associacoes |
| DELETE | /associacoes/produto/:produtoId/fornecedor/:fornecedorId |

---

# ✔ Validações Implementadas

### Produtos

- Nome obrigatório
- Código de barras obrigatório
- Código de barras único
- Apenas números no código de barras
- Quantidade obrigatória
- Categoria obrigatória

---

### Fornecedores

- Nome obrigatório
- CNPJ obrigatório
- CNPJ único
- Formatação automática do CNPJ
- Validação do CNPJ
- Telefone obrigatório
- Formatação automática do telefone
- Validação do telefone
- E-mail obrigatório
- Validação do e-mail

---

### Associação

- Produto obrigatório
- Fornecedor obrigatório
- Associação duplicada bloqueada

---

# 🧪 Testes

Durante o desenvolvimento foram realizados testes utilizando o **Insomnia** para validação da API.

Foram testadas todas as operações de:

- Cadastro
- Consulta
- Atualização
- Exclusão
- Associação
- Desassociação
- Validações
- Tratamento de erros

---

# 📌 Scripts Utilizados

## Backend

Instalar dependências

```bash
npm install
```

Criar tabelas

```bash
node database/tabelas.js
```

Popular banco de dados

```bash
node database/seed.js
```

Executar servidor

```bash
npm start
```

---

## Frontend

Instalar dependências

```bash
npm install
```

Executar aplicação

```bash
npm start
```

---

# 💡 Arquitetura

O backend foi desenvolvido seguindo o padrão **MVC (Model-View-Controller)**.

A estrutura está dividida em:

- Controllers
- Models
- Routes
- Database

O frontend foi organizado em:

- Components
- Pages
- Services

permitindo melhor organização e manutenção do código.

---

# 📷 Demonstração

O sistema possui as seguintes telas:

- Dashboard
- Cadastro de Produtos
- Cadastro de Fornecedores
- Associação Produto x Fornecedor

Todas desenvolvidas em React e integradas ao backend através de API REST.

---

# 📄 Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos como parte da disciplina **Projeto Integrador** da **Faculdade Gran**.

Não possui finalidade comercial.