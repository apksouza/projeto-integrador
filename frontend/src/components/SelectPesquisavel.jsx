import { useEffect, useRef, useState } from "react";

function SelectPesquisavel({
    label,
    placeholder,
    itens,
    valorSelecionado,
    aoSelecionar,
    obterTexto,
    pesquisarPor
}) {
    const [aberto, setAberto] = useState(false);
    const [pesquisa, setPesquisa] = useState("");
    const containerRef = useRef(null);

    const itemSelecionado = itens.find(
        (item) => Number(item.id) === Number(valorSelecionado)
    );

    const itensFiltrados = itens.filter((item) => {
        const termo = pesquisa.trim().toLowerCase();

        if (!termo) {
            return true;
        }

        return pesquisarPor(item)
            .join(" ")
            .toLowerCase()
            .includes(termo);
    });

    useEffect(() => {
        function fecharAoClicarFora(evento) {
            if (
                containerRef.current &&
                !containerRef.current.contains(evento.target)
            ) {
                setAberto(false);
                setPesquisa("");
            }
        }

        document.addEventListener("mousedown", fecharAoClicarFora);

        return () => {
            document.removeEventListener(
                "mousedown",
                fecharAoClicarFora
            );
        };
    }, []);

    function selecionarItem(item) {
        aoSelecionar(String(item.id));
        setAberto(false);
        setPesquisa("");
    }

    function limparSelecao(evento) {
        evento.stopPropagation();
        aoSelecionar("");
        setPesquisa("");
    }

    return (
        <div
            className="select-pesquisavel"
            ref={containerRef}
        >
            <label>{label}</label>

            <button
                type="button"
                className="select-pesquisavel-botao"
                onClick={() => setAberto((estado) => !estado)}
            >
                <span>
                    {itemSelecionado
                        ? obterTexto(itemSelecionado)
                        : placeholder}
                </span>

                <span className="select-seta">
                    {aberto ? "▲" : "▼"}
                </span>
            </button>

            {valorSelecionado && (
                <button
                    type="button"
                    className="select-limpar"
                    onClick={limparSelecao}
                    title="Limpar seleção"
                >
                    ×
                </button>
            )}

            {aberto && (
                <div className="select-pesquisavel-menu">
                    <input
                        type="text"
                        value={pesquisa}
                        onChange={(evento) =>
                            setPesquisa(evento.target.value)
                        }
                        placeholder="Pesquisar..."
                        autoFocus
                    />

                    <div className="select-pesquisavel-lista">
                        {itensFiltrados.length === 0 ? (
                            <p className="sem-resultados">
                                Nenhum resultado encontrado.
                            </p>
                        ) : (
                            itensFiltrados.map((item) => (
                                <button
                                    type="button"
                                    key={item.id}
                                    className="select-pesquisavel-opcao"
                                    onClick={() =>
                                        selecionarItem(item)
                                    }
                                >
                                    {obterTexto(item)}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SelectPesquisavel;