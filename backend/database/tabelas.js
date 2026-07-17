const banco = require("./conexao");

banco.serialize(() => {
    banco.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cnpj TEXT NOT NULL UNIQUE,
            endereco TEXT NOT NULL,
            telefone TEXT NOT NULL,
            email TEXT NOT NULL,
            contato TEXT NOT NULL
        )
    `, (erro) => {
        if (erro) {
            console.error("Erro ao criar tabela fornecedores:", erro.message);
        }
    });

    banco.run(`
        CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            codigo_barras TEXT NOT NULL UNIQUE,
            descricao TEXT NOT NULL,
            quantidade INTEGER NOT NULL DEFAULT 0
                CHECK (quantidade >= 0),
            categoria TEXT NOT NULL,
            validade TEXT,
            imagem TEXT
        )
    `, (erro) => {
        if (erro) {
            console.error("Erro ao criar tabela produtos:", erro.message);
        }
    });

    banco.run(`
        CREATE TABLE IF NOT EXISTS produto_fornecedor (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produto_id INTEGER NOT NULL,
            fornecedor_id INTEGER NOT NULL,

            FOREIGN KEY (produto_id)
                REFERENCES produtos(id)
                ON DELETE CASCADE,

            FOREIGN KEY (fornecedor_id)
                REFERENCES fornecedores(id)
                ON DELETE CASCADE,

            UNIQUE (produto_id, fornecedor_id)
        )
    `, (erro) => {
        if (erro) {
            console.error(
                "Erro ao criar tabela produto_fornecedor:",
                erro.message
            );
        } else {
            console.log("Tabelas verificadas com sucesso.");
        }
    });
});