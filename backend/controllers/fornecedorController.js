const Fornecedor = require("../models/fornecedor");

function validarFornecedor(dados) {
    dados = dados || {};

    const erros = {};

    const cnpj = String(dados.cnpj || "").replace(/\D/g, "");
    const telefone = String(dados.telefone || "").replace(/\D/g, "");
    const email = String(dados.email || "").trim();

    if (!dados.nome || !dados.nome.trim()) {
        erros.nome = "O nome da empresa é obrigatório.";
    }

    if (!cnpj) {
        erros.cnpj = "O CNPJ é obrigatório.";
    } else if (cnpj.length !== 14) {
        erros.cnpj = "O CNPJ deve possuir 14 números.";
    }

    if (!dados.endereco || !dados.endereco.trim()) {
        erros.endereco = "O endereço é obrigatório.";
    }

    if (!telefone) {
        erros.telefone = "O telefone é obrigatório.";
    } else if (telefone.length !== 10 && telefone.length !== 11) {
        erros.telefone =
            "O telefone deve possuir 10 ou 11 números, incluindo o DDD.";
    }

    if (!email) {
        erros.email = "O e-mail é obrigatório.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        erros.email = "Informe um e-mail válido.";
    }

    if (!dados.contato || !dados.contato.trim()) {
        erros.contato = "O contato principal é obrigatório.";
    }

    return erros;
}

function formatarCnpj(valor) {
    const numeros = String(valor || "").replace(/\D/g, "").slice(0, 14);

    return numeros.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
}

function formatarTelefone(valor) {
    const numeros = String(valor || "").replace(/\D/g, "").slice(0, 11);

    if (numeros.length === 11) {
        return numeros.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );
    }

    if (numeros.length === 10) {
        return numeros.replace(
            /^(\d{2})(\d{4})(\d{4})$/,
            "($1) $2-$3"
        );
    }

    return numeros;
}



exports.criarFornecedor = (req, res) => {
    const dados = req.body || {};
    const erros = validarFornecedor(dados);

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({
            mensagem: "Existem campos inválidos.",
            erros
        });
    }

    Fornecedor.buscarPorCnpj(dados.cnpj, (erroBusca, fornecedorExistente) => {
        if (erroBusca) {
            return res.status(500).json({
                mensagem: "Erro ao consultar o CNPJ.",
                erro: erroBusca.message
            });
        }

        if (fornecedorExistente) {
            return res.status(409).json({
                mensagem: "Fornecedor com esse CNPJ já está cadastrado!"
            });
        }

        const fornecedor = {
            nome: dados.nome.trim(),
            cnpj: formatarCnpj(dados.cnpj),
            endereco: dados.endereco.trim(),
            telefone: formatarTelefone(dados.telefone),
            email: dados.email.trim().toLowerCase(),
            contato: dados.contato.trim()
        };

        Fornecedor.criar(fornecedor, (erro, fornecedorCriado) => {
            if (erro) {
                return res.status(500).json({
                    mensagem: "Erro ao cadastrar fornecedor.",
                    erro: erro.message
                });
            }

            return res.status(201).json({
                mensagem: "Fornecedor cadastrado com sucesso!",
                fornecedor: fornecedorCriado
            });
        });
    });
};

exports.listarFornecedores = (req, res) => {
    Fornecedor.listar((erro, fornecedores) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao listar fornecedores.",
                erro: erro.message
            });
        }

        return res.status(200).json(fornecedores);
    });
};

exports.buscarFornecedorPorId = (req, res) => {
    const { id } = req.params;

    Fornecedor.buscarPorId(id, (erro, fornecedor) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao buscar fornecedor.",
                erro: erro.message
            });
        }

        if (!fornecedor) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado."
            });
        }

        return res.status(200).json(fornecedor);
    });
};

exports.atualizarFornecedor = (req, res) => {
    const { id } = req.params;
    const dados = req.body || {};
    const erros = validarFornecedor(dados);

    if (Object.keys(erros).length > 0) {
        return res.status(400).json({
            mensagem: "Existem campos inválidos.",
            erros
        });
    }

    Fornecedor.buscarPorId(id, (erroBusca, fornecedorExistente) => {
        if (erroBusca) {
            return res.status(500).json({
                mensagem: "Erro ao buscar fornecedor.",
                erro: erroBusca.message
            });
        }

        if (!fornecedorExistente) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado."
            });
        }

        Fornecedor.buscarPorCnpj(
            dados.cnpj,
            (erroCnpj, fornecedorMesmoCnpj) => {
                if (erroCnpj) {
                    return res.status(500).json({
                        mensagem: "Erro ao consultar o CNPJ.",
                        erro: erroCnpj.message
                    });
                }

                if (
                    fornecedorMesmoCnpj &&
                    Number(fornecedorMesmoCnpj.id) !== Number(id)
                ) {
                    return res.status(409).json({
                        mensagem:
                            "Fornecedor com esse CNPJ já está cadastrado!"
                    });
                }

                const fornecedorAtualizado = {
                    nome: dados.nome.trim(),
                    cnpj: formatarCnpj(dados.cnpj),
                    endereco: dados.endereco.trim(),
                    telefone: formatarTelefone(dados.telefone),
                    email: dados.email.trim().toLowerCase(),
                    contato: dados.contato.trim()
                };

                Fornecedor.atualizar(
                    id,
                    fornecedorAtualizado,
                    (erroAtualizacao, resultado) => {
                        if (erroAtualizacao) {
                            return res.status(500).json({
                                mensagem: "Erro ao atualizar fornecedor.",
                                erro: erroAtualizacao.message
                            });
                        }

                        if (resultado.alterados === 0) {
                            return res.status(404).json({
                                mensagem: "Fornecedor não encontrado."
                            });
                        }

                        return res.status(200).json({
                            mensagem: "Fornecedor atualizado com sucesso!",
                            fornecedor: {
                                id: Number(id),
                                ...fornecedorAtualizado
                            }
                        });
                    }
                );
            }
        );
    });
};

exports.excluirFornecedor = (req, res) => {
    const { id } = req.params;

    Fornecedor.excluir(id, (erro, resultado) => {
        if (erro) {
            return res.status(500).json({
                mensagem: "Erro ao excluir fornecedor.",
                erro: erro.message
            });
        }

        if (resultado.excluidos === 0) {
            return res.status(404).json({
                mensagem: "Fornecedor não encontrado."
            });
        }

        return res.status(200).json({
            mensagem: "Fornecedor excluído com sucesso!"
        });
    });
};