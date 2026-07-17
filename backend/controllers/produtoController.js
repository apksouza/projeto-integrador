const Produto = require("../models/produto");

function validarProduto(dados) {
    dados = dados || {};

    const erros = {};

    if (!dados.nome || !dados.nome.trim()) {
        erros.nome = "O nome do produto é obrigatório.";
    }

    const codigoBarras = String(dados.codigo_barras || "").replace(/\D/g, "");

    if (!codigoBarras) {
        erros.codigo_barras = "O código de barras é obrigatório.";
    } else if (!/^\d+$/.test(codigoBarras)) {
        erros.codigo_barras =
            "O código de barras deve conter apenas números.";
    } else if (codigoBarras.length < 8 || codigoBarras.length > 20) {
        erros.codigo_barras =
            "O código de barras deve possuir entre 8 e 20 números.";
    }

    if (!dados.descricao || !dados.descricao.trim()) {
        erros.descricao = "A descrição é obrigatória.";
    }

    if (
        dados.quantidade === undefined ||
        dados.quantidade === null ||
        dados.quantidade === ""
    ) {
        erros.quantidade = "A quantidade é obrigatória.";
    } else if (
        !Number.isInteger(Number(dados.quantidade)) ||
        Number(dados.quantidade) < 0
    ) {
        erros.quantidade =
            "A quantidade deve ser um número inteiro maior ou igual a zero.";
    }

    if (!dados.categoria || !dados.categoria.trim()) {
        erros.categoria = "A categoria é obrigatória.";
    }

    return erros;
}

exports.criarProduto = (req, res) => {
    const dados = req.body || {};
    const erros = validarProduto(dados); 

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({
            mensagem: "Existem campos inválidos.",
            erros
        });
    }

    Produto.buscarPorCodigoBarras(
        dados.codigo_barras,
        (erroBusca, produtoExistente) => {
            if (erroBusca) {
                return res.status(500).json({
                    mensagem: "Erro ao consultar o código de barras.",
                    erro: erroBusca.message
                });
            }

            if (produtoExistente) {
                return res.status(409).json({
                    mensagem:
                        "Produto com este código de barras já está cadastrado!"
                });
            }

            const produto = {
                nome: dados.nome.trim(),
                codigo_barras: String(dados.codigo_barras)
                .replace(/\D/g, "")
                .trim(),
                descricao: dados.descricao.trim(),
                quantidade: Number(dados.quantidade),
                categoria: dados.categoria.trim(),
                validade: dados.validade || null,
                imagem: dados.imagem || null
            };

            Produto.criar(produto, (erro, produtoCriado) => {
                if (erro) {
                    return res.status(500).json({
                        mensagem: "Erro ao cadastrar produto.",
                        erro: erro.message
                    });
                }

                return res.status(201).json({
                    mensagem: "Produto cadastrado com sucesso!",
                    produto: produtoCriado
                });
            });
        }
    );
};

exports.listarProdutos = (req, res) => {
    Produto.listar((erro, produtos) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao listar produtos.",
                erro: erro.message
            });
        }

        return res.status(200).json(produtos);
    });
};

exports.buscarProdutoPorId = (req, res) => {
    const { id } = req.params;

    Produto.buscarPorId(id, (erro, produto) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar produto.",
                erro: erro.message
            });
        }

        if (!produto) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json(produto);
    });
};

exports.atualizarProduto = (req, res) => {
    const { id } = req.params;
    const dados = req.body || {};
    const erros = validarProduto(dados);

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({
            mensagem: "Existem campos inválidos.",
            erros
        });
    }

    Produto.buscarPorId(id, (erroBusca, produtoExistente) => {
        if (erroBusca) {
            return res.status(500).json({
                mensagem: "Erro ao buscar produto.",
                erro: erroBusca.message
            });
        }

        if (!produtoExistente) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        Produto.buscarPorCodigoBarras(
            dados.codigo_barras,
            (erroCodigo, produtoMesmoCodigo) => {
                if (erroCodigo) {
                    return res.status(500).json({
                        mensagem: "Erro ao consultar o código de barras.",
                        erro: erroCodigo.message
                    });
                }

                if (
                    produtoMesmoCodigo &&
                    Number(produtoMesmoCodigo.id) !== Number(id)
                ) {
                    return res.status(409).json({
                        mensagem:
                            "Produto com este código de barras já está cadastrado!"
                    });
                }

                const produtoAtualizado = {
                    nome: dados.nome.trim(),
                    codigo_barras: String(dados.codigo_barras).trim(),
                    descricao: dados.descricao.trim(),
                    quantidade: Number(dados.quantidade),
                    categoria: dados.categoria.trim(),
                    validade: dados.validade || null,
                    imagem: dados.imagem || null
                };

                Produto.atualizar(
                    id,
                    produtoAtualizado,
                    (erroAtualizacao, resultado) => {
                        if (erroAtualizacao) {
                            return res.status(500).json({
                                mensagem: "Erro ao atualizar produto.",
                                erro: erroAtualizacao.message
                            });
                        }

                        if (resultado.alterados === 0) {
                            return res.status(404).json({
                                mensagem: "Produto não encontrado."
                            });
                        }

                        return res.status(200).json({
                            mensagem: "Produto atualizado com sucesso!",
                            produto: {
                                id: Number(id),
                                ...produtoAtualizado
                            }
                        });
                    }
                );
            }
        );
    });
};

exports.excluirProduto = (req, res) => {
    const { id } = req.params;

    Produto.excluir(id, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao excluir produto.",
                erro: erro.message
            });
        }

        if (resultado.excluidos === 0) {
            return res.status(404).json({
                mensagem: "Produto não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Produto excluído com sucesso!"
        });
    });
};