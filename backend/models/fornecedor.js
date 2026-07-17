const banco = require("../database/conexao");

const Fornecedor = {
    criar(dados, callback) {
        const sql = `
            INSERT INTO fornecedores (
                nome,
                cnpj,
                endereco,
                telefone,
                email,
                contato
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const parametros = [
            dados.nome,
            dados.cnpj,
            dados.endereco,
            dados.telefone,
            dados.email,
            dados.contato
        ];

        banco.run(sql, parametros, function (erro) {
            callback(erro, {
                id: this?.lastID,
                ...dados
            });
        });
    },

    listar(callback) {
        banco.all(
            "SELECT * FROM fornecedores ORDER BY id DESC",
            [],
            callback
        );
    },

    buscarPorId(id, callback) {
        banco.get(
            "SELECT * FROM fornecedores WHERE id = ?",
            [id],
            callback
        );
    },

    buscarPorCnpj(cnpj, callback) {
        banco.get(
            "SELECT * FROM fornecedores WHERE cnpj = ?",
            [cnpj],
            callback
        );
    },

    atualizar(id, dados, callback) {
        const sql = `
            UPDATE fornecedores
            SET
                nome = ?,
                cnpj = ?,
                endereco = ?,
                telefone = ?,
                email = ?,
                contato = ?
            WHERE id = ?
        `;

        const parametros = [
            dados.nome,
            dados.cnpj,
            dados.endereco,
            dados.telefone,
            dados.email,
            dados.contato,
            id
        ];

        banco.run(sql, parametros, function (erro) {
            callback(erro, {
                alterados: this?.changes || 0
            });
        });
    },

    excluir(id, callback) {
        banco.run(
            "DELETE FROM fornecedores WHERE id = ?",
            [id],
            function (erro) {
                callback(erro, {
                    excluidos: this?.changes || 0
                });
            }
        );
    }
};

module.exports = Fornecedor;