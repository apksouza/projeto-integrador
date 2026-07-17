import { useEffect, useState } from "react";
import api from "../services/api";

function Fornecedores() {
    const formularioInicial = {
        nome: "",
        cnpj: "",
        endereco: "",
        telefone: "",
        email: "",
        contato: ""
    };

    const [fornecedores, setFornecedores] = useState([]);
    const [formulario, setFormulario] = useState(formularioInicial);
    const [fornecedorEditando, setFornecedorEditando] = useState(null);
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    async function carregarFornecedores() {
        try {
            const resposta = await api.get("/fornecedores");
            setFornecedores(resposta.data);
        } catch {
            setErro("Não foi possível carregar os fornecedores.");
        }
    }

    useEffect(() => {
        carregarFornecedores();
    }, []);
    function aplicarMascaraCnpj(valor) {
        return valor
            .replace(/\D/g, "")
            .slice(0, 14)
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    function aplicarMascaraTelefone(valor) {
        const numeros = valor.replace(/\D/g, "").slice(0, 11);

        if (numeros.length <= 10) {
            return numeros
                .replace(/^(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }

        return numeros
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2");
    }
    function alterarCampo(evento) {
        const { name, value } = evento.target;

        let novoValor = value;

        if (name === "cnpj") {
            novoValor = aplicarMascaraCnpj(value);
        }

        if (name === "telefone") {
            novoValor = aplicarMascaraTelefone(value);
        }

        setFormulario((dadosAtuais) => ({
            ...dadosAtuais,
            [name]: novoValor
        }));
    }

    function limparFormulario() {
        setFormulario(formularioInicial);
        setFornecedorEditando(null);
    }

    async function salvarFornecedor(e) {
        e.preventDefault();

        try {
            if (fornecedorEditando) {
                const resposta = await api.put(
                    `/fornecedores/${fornecedorEditando}`,
                    formulario
                );

                setMensagem(resposta.data.mensagem);
            } else {
                const resposta = await api.post(
                    "/fornecedores",
                    formulario
                );

                setMensagem(resposta.data.mensagem);
            }

            setErro("");
            limparFormulario();
            carregarFornecedores();

        } catch (erro) {
            const resposta = erro.response?.data;

            if (resposta?.erros) {
                setErro(Object.values(resposta.erros).join(" "));
            } else {
                setErro(
                    resposta?.mensagem ||
                    "Erro ao salvar fornecedor."
                );
            }
        }
    }

    function editarFornecedor(fornecedor) {
        setFornecedorEditando(fornecedor.id);
        setFormulario(fornecedor);
    }

    async function excluirFornecedor(id) {

        if (!window.confirm("Deseja excluir este fornecedor?"))
            return;

        try {

            const resposta = await api.delete(
                `/fornecedores/${id}`
            );

            setMensagem(resposta.data.mensagem);
            setErro("");

            carregarFornecedores();

        } catch (erro) {

            setErro(
                erro.response?.data?.mensagem ||
                "Erro ao excluir fornecedor."
            );

        }
    }

    return (
        <main>

            <h1>Cadastro de Fornecedores</h1>

            {mensagem &&
                <p className="mensagem-sucesso">
                    {mensagem}
                </p>
            }

            {erro &&
                <p className="mensagem-erro">
                    {erro}
                </p>
            }

            <form onSubmit={salvarFornecedor}>

                <label>
                    Nome da Empresa
                    <input
                        name="nome"
                        value={formulario.nome}
                        onChange={alterarCampo}
                        placeholder="Insira o nome da empresa"
                    />
                </label>

                <label>
                    CNPJ
                    <input
                        name="cnpj"
                        value={formulario.cnpj}
                        onChange={alterarCampo}
                        placeholder="00.000.000/0000-00"
                        maxLength="18"
                    />
                </label>

                <label>
                    Endereço
                    <textarea
                        name="endereco"
                        value={formulario.endereco}
                        onChange={alterarCampo}
                        placeholder="Insira o endereço completo"
                    />
                </label>

                <label>
                    Telefone
                    <input
                        name="telefone"
                        value={formulario.telefone}
                        onChange={alterarCampo}
                        placeholder="(00) 00000-0000"
                        maxLength="15"
                    />
                </label>

                <label>
                    E-mail
                    <input
                        type="email"
                        name="email"
                        value={formulario.email}
                        onChange={alterarCampo}
                        placeholder="exemplo@fornecedor.com"
                    />
                </label>

                <label>
                    Contato Principal
                    <input
                        name="contato"
                        value={formulario.contato}
                        onChange={alterarCampo}
                        placeholder="Nome do contato"
                    />
                </label>

                <div>

                    <button type="submit">

                        {fornecedorEditando
                            ? "Atualizar"
                            : "Cadastrar"}

                    </button>

                    {fornecedorEditando &&
                        <button
                            type="button"
                            onClick={limparFormulario}
                        >
                            Cancelar
                        </button>
                    }

                </div>

            </form>

            <h2>Fornecedores cadastrados</h2>

            <table>

                <thead>

                    <tr>
                        <th>Empresa</th>
                        <th>CNPJ</th>
                        <th>Contato</th>
                        <th>Ações</th>
                    </tr>

                </thead>

                <tbody>

                    {fornecedores.map(fornecedor => (

                        <tr key={fornecedor.id}>

                            <td>{fornecedor.nome}</td>
                            <td>{fornecedor.cnpj}</td>
                            <td>{fornecedor.contato}</td>

                            <td>

                                <button
                                    onClick={() =>
                                        editarFornecedor(fornecedor)
                                    }
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() =>
                                        excluirFornecedor(fornecedor.id)
                                    }
                                >
                                    Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </main>
    );
}

export default Fornecedores;