const ProdutoFornecedor = require("../models/produtoFornecedor");
const Produto = require("../models/produto");
const Fornecedor = require("../models/fornecedor");

exports.associarFornecedor = (req, res) => {
    const { produto_id, fornecedor_id } = req.body || {};

    if (!produto_id || !fornecedor_id) {
        return res.status(400).json({
            mensagem: "Produto e fornecedor são obrigatórios."
        });
    }

    Produto.buscarPorId(produto_id, (erroProduto, produto) => {
        if (erroProduto) {
            return res.status(500).json({
                mensagem: "Erro ao buscar produto.",
                erro: erroProduto.message
            });
        }

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        Fornecedor.buscarPorId(
            fornecedor_id,
            (erroFornecedor, fornecedor) => {
                if (erroFornecedor) {
                    return res.status(500).json({
                        mensagem: "Erro ao buscar fornecedor.",
                        erro: erroFornecedor.message
                    });
                }

                if (!fornecedor) {
                    return res.status(404).json({
                        mensagem: "Fornecedor não encontrado."
                    });
                }

                ProdutoFornecedor.buscarAssociacao(
                    produto_id,
                    fornecedor_id,
                    (erroBusca, associacaoExistente) => {
                        if (erroBusca) {
                            return res.status(500).json({
                                mensagem: "Erro ao consultar associação.",
                                erro: erroBusca.message
                            });
                        }

                        if (associacaoExistente) {
                            return res.status(409).json({
                                mensagem:
                                    "Fornecedor já está associado a este produto!"
                            });
                        }

                        ProdutoFornecedor.associar(
                            produto_id,
                            fornecedor_id,
                            (erro, associacao) => {
                                if (erro) {
                                    return res.status(500).json({
                                        mensagem:
                                            "Erro ao associar fornecedor ao produto.",
                                        erro: erro.message
                                    });
                                }

                                return res.status(201).json({
                                    mensagem:
                                        "Fornecedor associado com sucesso ao produto!",
                                    associacao
                                });
                            }
                        );
                    }
                );
            }
        );
    });
};

exports.listarAssociacoes = (req, res) => {
    ProdutoFornecedor.listar((erro, associacoes) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao listar associações.",
                erro: erro.message
            });
        }

        return res.status(200).json(associacoes);
    });
};

exports.listarFornecedoresPorProduto = (req, res) => {
    const { produtoId } = req.params;

    Produto.buscarPorId(produtoId, (erroProduto, produto) => {
        if (erroProduto) {
            return res.status(500).json({
                mensagem: "Erro ao buscar produto.",
                erro: erroProduto.message
            });
        }

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        ProdutoFornecedor.listarFornecedoresPorProduto(
            produtoId,
            (erro, fornecedores) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem:
                            "Erro ao listar fornecedores do produto.",
                        erro: erro.message
                    });
                }

                return res.status(200).json({
                    produto,
                    fornecedores
                });
            }
        );
    });
};

exports.listarProdutosPorFornecedor = (req, res) => {
    const { fornecedorId } = req.params;

    Fornecedor.buscarPorId(
        fornecedorId,
        (erroFornecedor, fornecedor) => {
            if (erroFornecedor) {
                return res.status(500).json({
                    mensagem: "Erro ao buscar fornecedor.",
                    erro: erroFornecedor.message
                });
            }

            if (!fornecedor) {
                return res.status(404).json({
                    mensagem: "Fornecedor não encontrado."
                });
            }

            ProdutoFornecedor.listarProdutosPorFornecedor(
                fornecedorId,
                (erro, produtos) => {
                    if (erro) {
                        return res.status(500).json({
                            mensagem:
                                "Erro ao listar produtos do fornecedor.",
                            erro: erro.message
                        });
                    }

                    return res.status(200).json({
                        fornecedor,
                        produtos
                    });
                }
            );
        }
    );
};

exports.desassociarFornecedor = (req, res) => {
    const { produtoId, fornecedorId } = req.params;

    ProdutoFornecedor.desassociar(
        produtoId,
        fornecedorId,
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: "Erro ao desassociar fornecedor.",
                    erro: erro.message
                });
            }

            if (resultado.excluidos === 0) {
                return res.status(404).json({
                    mensagem: "Associação não encontrada."
                });
            }

            return res.status(200).json({
                mensagem: "Fornecedor desassociado com sucesso!"
            });
        }
    );
};