import { useEffect, useState } from "react";

import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Associacao from "./pages/Associacao";
import api from "./services/api";

import "./App.css";

function App() {
    const [pagina, setPagina] = useState("produtos");

    const [resumo, setResumo] = useState({
        produtos: 0,
        fornecedores: 0,
        associacoes: 0
    });

    async function carregarResumo() {
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

            setResumo({
                produtos: respostaProdutos.data.length,
                fornecedores: respostaFornecedores.data.length,
                associacoes: respostaAssociacoes.data.length
            });
        } catch (erro) {
            console.error("Erro ao carregar resumo:", erro);
        }
    }

    useEffect(() => {
        carregarResumo();
    }, [pagina]);

    function mudarPagina(novaPagina) {
        setPagina(novaPagina);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function obterTituloPagina() {
        if (pagina === "produtos") {
            return "Gerenciamento de Produtos";
        }

        if (pagina === "fornecedores") {
            return "Gerenciamento de Fornecedores";
        }

        return "Associação Produto e Fornecedor";
    }

    return (
        <div className="aplicacao">
            <aside className="menu-lateral">
                <div className="marca">
                    <div className="marca-icone">📦</div>

                    <div>
                        <h1>Estoque</h1>
                        <span>Controle inteligente</span>
                    </div>
                </div>

                <nav className="navegacao">
                    <button
                        type="button"
                        className={
                            pagina === "produtos"
                                ? "item-menu ativo"
                                : "item-menu"
                        }
                        onClick={() => mudarPagina("produtos")}
                    >
                        <span className="item-menu-icone">📦</span>
                        <span>Produtos</span>
                    </button>

                    <button
                        type="button"
                        className={
                            pagina === "fornecedores"
                                ? "item-menu ativo"
                                : "item-menu"
                        }
                        onClick={() => mudarPagina("fornecedores")}
                    >
                        <span className="item-menu-icone">🏢</span>
                        <span>Fornecedores</span>
                    </button>

                    <button
                        type="button"
                        className={
                            pagina === "associacao"
                                ? "item-menu ativo"
                                : "item-menu"
                        }
                        onClick={() => mudarPagina("associacao")}
                    >
                        <span className="item-menu-icone">🤝</span>
                        <span>Associações</span>
                    </button>
                </nav>

                <div className="menu-rodape">
                    <p>Projeto Integrador</p>
                    <span>Faculdade Gran</span>
                </div>
            </aside>

            <div className="conteudo-aplicacao">
                <header className="topo">
                    <div>
                        <span className="topo-legenda">
                            Sistema de Controle de Estoque
                        </span>

                        <h2>{obterTituloPagina()}</h2>
                    </div>

                    <div className="usuario">
                        <div className="usuario-avatar">AS</div>

                        <div>
                            <strong>Administrador</strong>
                            <span>Sistema online</span>
                        </div>
                    </div>
                </header>

                <section className="painel-resumo">
                    <button
                        type="button"
                        className="card-resumo"
                        onClick={() => mudarPagina("produtos")}
                    >
                        <div className="card-icone azul">📦</div>

                        <div>
                            <span>Produtos</span>
                            <strong>{resumo.produtos}</strong>
                            <small>Itens cadastrados</small>
                        </div>
                    </button>

                    <button
                        type="button"
                        className="card-resumo"
                        onClick={() => mudarPagina("fornecedores")}
                    >
                        <div className="card-icone verde">🏢</div>

                        <div>
                            <span>Fornecedores</span>
                            <strong>{resumo.fornecedores}</strong>
                            <small>Empresas cadastradas</small>
                        </div>
                    </button>

                    <button
                        type="button"
                        className="card-resumo"
                        onClick={() => mudarPagina("associacao")}
                    >
                        <div className="card-icone roxo">🤝</div>

                        <div>
                            <span>Associações</span>
                            <strong>{resumo.associacoes}</strong>
                            <small>Vínculos cadastrados</small>
                        </div>
                    </button>
                </section>

                <section className="area-pagina">
                    {pagina === "produtos" && <Produtos />}

                    {pagina === "fornecedores" && <Fornecedores />}

                    {pagina === "associacao" && <Associacao />}
                </section>
            </div>
        </div>
    );
}

export default App;