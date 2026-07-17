const banco = require("../database/conexao");

const Produto = {
    criar(dados, callback) {
        const sql = `
            INSERT INTO produtos (
                nome,
                codigo_barras,
                descricao,
                quantidade,
                categoria,
                validade,
                imagem
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const parametros = [
            dados.nome,
            dados.codigo_barras,
            dados.descricao,
            dados.quantidade,
            dados.categoria,
            dados.validade || null,
            dados.imagem || null
        ];

        banco.run(sql, parametros, function (erro) {
            callback(erro, {
                id: this?.lastID,
                ...dados
            });
        });
    },

    listar(callback) {
        const sql = `
            SELECT *
            FROM produtos
            ORDER BY id DESC
        `;

        banco.all(sql, [], callback);
    },

    buscarPorId(id, callback) {
        const sql = `
            SELECT *
            FROM produtos
            WHERE id = ?
        `;

        banco.get(sql, [id], callback);
    },

    buscarPorCodigoBarras(codigoBarras, callback) {
        const sql = `
            SELECT *
            FROM produtos
            WHERE codigo_barras = ?
        `;

        banco.get(sql, [codigoBarras], callback);
    },

    atualizar(id, dados, callback) {
        const sql = `
            UPDATE produtos
            SET
                nome = ?,
                codigo_barras = ?,
                descricao = ?,
                quantidade = ?,
                categoria = ?,
                validade = ?,
                imagem = ?
            WHERE id = ?
        `;

        const parametros = [
            dados.nome,
            dados.codigo_barras,
            dados.descricao,
            dados.quantidade,
            dados.categoria,
            dados.validade || null,
            dados.imagem || null,
            id
        ];

        banco.run(sql, parametros, function (erro) {
            callback(erro, {
                alterados: this?.changes || 0
            });
        });
    },

    excluir(id, callback) {
        const sql = `
            DELETE FROM produtos
            WHERE id = ?
        `;

        banco.run(sql, [id], function (erro) {
            callback(erro, {
                excluidos: this?.changes || 0
            });
        });
    }
};

module.exports = Produto;