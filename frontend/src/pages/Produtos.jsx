import { useEffect, useState } from "react";
import api from "../services/api";

function Produtos() {
    const formularioInicial = {
        nome: "",
        codigo_barras: "",
        descricao: "",
        quantidade: "",
        categoria: "",
        validade: "",
        imagem: ""
    };

    const [produtos, setProdutos] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function carregarProdutos() {
        try {
            const resposta = await api.get("/produtos");
            setProdutos(resposta.data);
        } catch {
            setErro("Não foi possível carregar os produtos.");
        }
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    function alterarCampo(evento) {
        const { name, value } = evento.target;

        let novoValor = value;

        if (name === "codigo_barras") {
            novoValor = value.replace(/\D/g, "");
        }

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            [name]: novoValor
        }));
    }

    function limparFormulario() {
        setFormulario(formularioInicial);
        setProdutoEditando(null);
    }

    async function salvarProduto(evento) {
        evento.preventDefault();

        setMensagem("");
        setErro("");

        const dados = {
            ...formulario,
            quantidade: Number(formulario.quantidade),
            validade: formulario.validade || null,
            imagem: formulario.imagem || null
        };

        try {
            if (produtoEditando) {
                const resposta = await api.put(
                    `/produtos/${produtoEditando}`,
                    dados
                );

                setMensagem(resposta.data.mensagem);
            } else {
                const resposta = await api.post("/produtos", dados);
                setMensagem(resposta.data.mensagem);
            }

            limparFormulario();
            carregarProdutos();
        } catch (erroRequisicao) {
            const resposta = erroRequisicao.response?.data;

            if (resposta?.erros) {
                setErro(Object.values(resposta.erros).join(" "));
            } else {
                setErro(
                    resposta?.mensagem ||
                        "Não foi possível salvar o produto."
                );
            }
        }
    }

    function editarProduto(produto) {
        setProdutoEditando(produto.id);

        setFormulario({
            nome: produto.nome,
            codigo_barras: produto.codigo_barras,
            descricao: produto.descricao,
            quantidade: produto.quantidade,
            categoria: produto.categoria,
            validade: produto.validade || "",
            imagem: produto.imagem || ""
        });

        setMensagem("");
        setErro("");
    }

    async function excluirProduto(id) {
        const confirmou = window.confirm(
            "Deseja realmente excluir este produto?"
        );

        if (!confirmou) {
            return;
        }

        try {
            const resposta = await api.delete(`/produtos/${id}`);

            setMensagem(resposta.data.mensagem);
            setErro("");
            carregarProdutos();
        } catch (erroRequisicao) {
            setErro(
                erroRequisicao.response?.data?.mensagem ||
                    "Não foi possível excluir o produto."
            );
        }
    }

    return (
        <main>
            <h1>Cadastro de Produtos</h1>

            {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
            {erro && <p className="mensagem-erro">{erro}</p>}

            <form onSubmit={salvarProduto}>
                <label>
                    Nome do produto
                    <input
                        type="text"
                        name="nome"
                        value={formulario.nome}
                        onChange={alterarCampo}
                        placeholder="Insira o nome do produto"
                    />
                </label>

                <label>
                    Código de barras
                    <input
                        type="text"
                        name="codigo_barras"
                        inputMode="numeric"
                        maxLength="20"
                        value={formulario.codigo_barras}
                        onChange={alterarCampo}
                        placeholder="Insira o código de barras"
                    />
                </label>

                <label>
                    Descrição
                    <textarea
                        name="descricao"
                        value={formulario.descricao}
                        onChange={alterarCampo}
                        placeholder="Descreva brevemente o produto"
                    />
                </label>

                <label>
                    Quantidade
                    <input
                        type="number"
                        min="0"
                        name="quantidade"
                        value={formulario.quantidade}
                        onChange={alterarCampo}
                        placeholder="Quantidade disponível"
                    />
                </label>

                <label>
                    Categoria
                    <select
                        name="categoria"
                        value={formulario.categoria}
                        onChange={alterarCampo}
                    >
                        <option value="">Selecione</option>
                        <option value="Eletrônicos">Eletrônicos</option>
                        <option value="Alimentos">Alimentos</option>
                        <option value="Vestuário">Vestuário</option>
                        <option value="Outro">Outro</option>
                    </select>
                </label>

                <label>
                    Data de validade
                    <input
                        type="date"
                        name="validade"
                        value={formulario.validade}
                        onChange={alterarCampo}
                    />
                </label>

                <label>
                    URL da imagem
                    <input
                        type="text"
                        name="imagem"
                        value={formulario.imagem}
                        onChange={alterarCampo}
                        placeholder="Endereço da imagem"
                    />
                </label>

                <div>
                    <button type="submit">
                        {produtoEditando ? "Atualizar" : "Cadastrar"}
                    </button>

                    {produtoEditando && (
                        <button
                            type="button"
                            onClick={limparFormulario}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h2>Produtos cadastrados</h2>

            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Código</th>
                            <th>Quantidade</th>
                            <th>Categoria</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.nome}</td>
                                <td>{produto.codigo_barras}</td>
                                <td>{produto.quantidade}</td>
                                <td>{produto.categoria}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            editarProduto(produto)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            excluirProduto(produto.id)
                                        }
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}

export default Produtos;