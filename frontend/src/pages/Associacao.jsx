import { useEffect, useState } from "react";
import api from "../services/api";
import SelectPesquisavel from "../components/SelectPesquisavel";

function Associacao() {
    const [produtos, setProdutos] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [associacoes, setAssociacoes] = useState([]);

    const [produtoId, setProdutoId] = useState("");
    const [fornecedorId, setFornecedorId] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function carregarDados() {
        try {
            const [
                respostaProdutos,
                respostaFornecedores,
                respostaAssociacoes
            ] = await Promise.all([
                api.get("/produtos"),
                api.get("/fornecedores"),
                api.get("/associacoes")
            ]);

            setProdutos(respostaProdutos.data);
            setFornecedores(respostaFornecedores.data);
            setAssociacoes(respostaAssociacoes.data);

            setErro("");
        } catch {
            setErro(
                "Não foi possível carregar os dados da associação."
            );
        }
    }

    useEffect(() => {
        carregarDados();
    }, []);

    async function associarFornecedor(evento) {
        evento.preventDefault();

        setMensagem("");
        setErro("");

        if (!produtoId || !fornecedorId) {
            setErro("Selecione um produto e um fornecedor.");
            return;
        }

        try {
            const resposta = await api.post("/associacoes", {
                produto_id: Number(produtoId),
                fornecedor_id: Number(fornecedorId)
            });

            setMensagem(resposta.data.mensagem);

            setProdutoId("");
            setFornecedorId("");

            await carregarDados();
        } catch (erroRequisicao) {
            setErro(
                erroRequisicao.response?.data?.mensagem ||
                    "Não foi possível realizar a associação."
            );
        }
    }

    async function desassociarFornecedor(
        produtoIdSelecionado,
        fornecedorIdSelecionado
    ) {
        const confirmou = window.confirm(
            "Deseja realmente desassociar este fornecedor do produto?"
        );

        if (!confirmou) {
            return;
        }

        try {
            const resposta = await api.delete(
                `/associacoes/produto/${produtoIdSelecionado}/fornecedor/${fornecedorIdSelecionado}`
            );

            setMensagem(resposta.data.mensagem);
            setErro("");

            await carregarDados();
        } catch (erroRequisicao) {
            setErro(
                erroRequisicao.response?.data?.mensagem ||
                    "Não foi possível remover a associação."
            );
        }
    }

    const produtoSelecionado = produtos.find(
        (produto) =>
            Number(produto.id) === Number(produtoId)
    );

    const fornecedorSelecionado = fornecedores.find(
        (fornecedor) =>
            Number(fornecedor.id) === Number(fornecedorId)
    );

    return (
        <main>
            <h1>Associação de Fornecedor a Produto</h1>

            {mensagem && (
                <p className="mensagem-sucesso">
                    {mensagem}
                </p>
            )}

            {erro && (
                <p className="mensagem-erro">
                    {erro}
                </p>
            )}

            <form onSubmit={associarFornecedor}>
                <SelectPesquisavel
                    label="Produto"
                    placeholder="Selecione um produto"
                    itens={produtos}
                    valorSelecionado={produtoId}
                    aoSelecionar={setProdutoId}
                    obterTexto={(produto) =>
                        `${produto.nome} — ID: ${produto.id} — Código: ${produto.codigo_barras}`
                    }
                    pesquisarPor={(produto) => [
                        String(produto.id),
                        produto.nome || "",
                        produto.codigo_barras || "",
                        produto.descricao || "",
                        produto.categoria || ""
                    ]}
                />

                <SelectPesquisavel
                    label="Fornecedor"
                    placeholder="Selecione um fornecedor"
                    itens={fornecedores}
                    valorSelecionado={fornecedorId}
                    aoSelecionar={setFornecedorId}
                    obterTexto={(fornecedor) =>
                        `${fornecedor.nome} — ${fornecedor.cnpj}`
                    }
                    pesquisarPor={(fornecedor) => [
                        String(fornecedor.id),
                        fornecedor.nome || "",
                        fornecedor.cnpj || "",
                        fornecedor.telefone || "",
                        fornecedor.email || "",
                        fornecedor.contato || "",
                        fornecedor.endereco || ""
                    ]}
                />

                {produtoSelecionado && (
                    <section className="detalhes-produto">
                        <h2>Detalhes do Produto</h2>

                        <p>
                            <strong>Nome:</strong>{" "}
                            {produtoSelecionado.nome}
                        </p>

                        <p>
                            <strong>ID:</strong>{" "}
                            {produtoSelecionado.id}
                        </p>

                        <p>
                            <strong>Código de barras:</strong>{" "}
                            {produtoSelecionado.codigo_barras}
                        </p>

                        <p>
                            <strong>Descrição:</strong>{" "}
                            {produtoSelecionado.descricao}
                        </p>

                        <p>
                            <strong>Quantidade:</strong>{" "}
                            {produtoSelecionado.quantidade}
                        </p>

                        <p>
                            <strong>Categoria:</strong>{" "}
                            {produtoSelecionado.categoria}
                        </p>

                        {produtoSelecionado.imagem && (
                            <img
                                src={produtoSelecionado.imagem}
                                alt={produtoSelecionado.nome}
                            />
                        )}
                    </section>
                )}

                {fornecedorSelecionado && (
                    <section className="detalhes-produto">
                        <h2>Detalhes do Fornecedor</h2>

                        <p>
                            <strong>Empresa:</strong>{" "}
                            {fornecedorSelecionado.nome}
                        </p>

                        <p>
                            <strong>ID:</strong>{" "}
                            {fornecedorSelecionado.id}
                        </p>

                        <p>
                            <strong>CNPJ:</strong>{" "}
                            {fornecedorSelecionado.cnpj}
                        </p>

                        <p>
                            <strong>Telefone:</strong>{" "}
                            {fornecedorSelecionado.telefone}
                        </p>

                        <p>
                            <strong>E-mail:</strong>{" "}
                            {fornecedorSelecionado.email}
                        </p>

                        <p>
                            <strong>Contato:</strong>{" "}
                            {fornecedorSelecionado.contato}
                        </p>
                    </section>
                )}

                <div>
                    <button type="submit">
                        Associar Fornecedor
                    </button>
                </div>
            </form>

            <h2>Fornecedores associados aos produtos</h2>

            {associacoes.length === 0 ? (
                <p>Nenhuma associação cadastrada.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Código de barras</th>
                            <th>Fornecedor</th>
                            <th>CNPJ</th>
                            <th>Ação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {associacoes.map((associacao) => (
                            <tr key={associacao.id}>
                                <td>
                                    {associacao.produto_nome}
                                </td>

                                <td>
                                    {associacao.codigo_barras}
                                </td>

                                <td>
                                    {associacao.fornecedor_nome}
                                </td>

                                <td>
                                    {associacao.cnpj}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            desassociarFornecedor(
                                                associacao.produto_id,
                                                associacao.fornecedor_id
                                            )
                                        }
                                    >
                                        Desassociar
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

export default Associacao;