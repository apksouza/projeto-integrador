const banco = require("./conexao");


banco.serialize(()=>{


banco.run(`
CREATE TABLE IF NOT EXISTS fornecedores(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL,
cnpj TEXT UNIQUE NOT NULL,
endereco TEXT,
telefone TEXT,
email TEXT,
contato TEXT
)
`);



banco.run(`
CREATE TABLE IF NOT EXISTS produtos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT NOT NULL,
codigo_barras TEXT UNIQUE,
descricao TEXT,
quantidade INTEGER,
categoria TEXT,
validade DATE
)
`);



banco.run(`
CREATE TABLE IF NOT EXISTS produto_fornecedor(
id INTEGER PRIMARY KEY AUTOINCREMENT,
produto_id INTEGER,
fornecedor_id INTEGER
)
`);


});