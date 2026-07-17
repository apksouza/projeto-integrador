const banco = require("../database/conexao");

const ProdutoFornecedor = {
    associar(produtoId, fornecedorId, callback) {
        const sql = `
            INSERT INTO produto_fornecedor (
                produto_id,
                fornecedor_id
            )
            VALUES (?, ?)
        `;

        banco.run(
            sql,
            [produtoId, fornecedorId],
            function (erro) {
                callback(erro, {
                    id: this?.lastID,
                    produto_id: Number(produtoId),
                    fornecedor_id: Number(fornecedorId)
                });
            }
        );
    },

    buscarAssociacao(produtoId, fornecedorId, callback) {
        const sql = `
            SELECT *
            FROM produto_fornecedor
            WHERE produto_id = ?
              AND fornecedor_id = ?
        `;

        banco.get(sql, [produtoId, fornecedorId], callback);
    },

    listar(callback) {
        const sql = `
            SELECT
                pf.id,
                pf.produto_id,
                p.nome AS produto_nome,
                p.codigo_barras,
                pf.fornecedor_id,
                f.nome AS fornecedor_nome,
                f.cnpj
            FROM produto_fornecedor pf
            INNER JOIN produtos p
                ON p.id = pf.produto_id
            INNER JOIN fornecedores f
                ON f.id = pf.fornecedor_id
            ORDER BY pf.id DESC
        `;

        banco.all(sql, [], callback);
    },

    listarFornecedoresPorProduto(produtoId, callback) {
        const sql = `
            SELECT
                pf.id AS associacao_id,
                f.id,
                f.nome,
                f.cnpj,
                f.endereco,
                f.telefone,
                f.email,
                f.contato
            FROM produto_fornecedor pf
            INNER JOIN fornecedores f
                ON f.id = pf.fornecedor_id
            WHERE pf.produto_id = ?
            ORDER BY f.nome
        `;

        banco.all(sql, [produtoId], callback);
    },

    listarProdutosPorFornecedor(fornecedorId, callback) {
        const sql = `
            SELECT
                pf.id AS associacao_id,
                p.id,
                p.nome,
                p.codigo_barras,
                p.descricao,
                p.quantidade,
                p.categoria,
                p.validade,
                p.imagem
            FROM produto_fornecedor pf
            INNER JOIN produtos p
                ON p.id = pf.produto_id
            WHERE pf.fornecedor_id = ?
            ORDER BY p.nome
        `;

        banco.all(sql, [fornecedorId], callback);
    },

    desassociar(produtoId, fornecedorId, callback) {
        const sql = `
            DELETE FROM produto_fornecedor
            WHERE produto_id = ?
              AND fornecedor_id = ?
        `;

        banco.run(
            sql,
            [produtoId, fornecedorId],
            function (erro) {
                callback(erro, {
                    excluidos: this?.changes || 0
                });
            }
        );
    }
};

module.exports = ProdutoFornecedor;