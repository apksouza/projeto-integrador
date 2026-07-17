const banco = require("./conexao");

// ======================================================
// CONFIGURAÇÕES
// ======================================================

const TOTAL_PRODUTOS = 1000;
const TOTAL_FORNECEDORES = 200;

const catalogoProdutos = [
    {
        nome: "Notebook",
        categoria: "Eletrônicos",
        descricao: "Notebook para atividades profissionais e acadêmicas"
    },
    {
        nome: "Monitor",
        categoria: "Eletrônicos",
        descricao: "Monitor com resolução Full HD e conexão HDMI"
    },
    {
        nome: "Teclado Mecânico",
        categoria: "Eletrônicos",
        descricao: "Teclado mecânico com conexão USB"
    },
    {
        nome: "Mouse Sem Fio",
        categoria: "Eletrônicos",
        descricao: "Mouse óptico sem fio com receptor USB"
    },
    {
        nome: "Fone de Ouvido",
        categoria: "Eletrônicos",
        descricao: "Fone de ouvido com som estéreo"
    },
    {
        nome: "Roteador Wi-Fi",
        categoria: "Eletrônicos",
        descricao: "Roteador sem fio para redes residenciais e comerciais"
    },
    {
        nome: "Impressora Multifuncional",
        categoria: "Eletrônicos",
        descricao: "Impressora multifuncional com impressão e digitalização"
    },
    {
        nome: "Carregador USB",
        categoria: "Eletrônicos",
        descricao: "Carregador USB para dispositivos eletrônicos"
    },
    {
        nome: "Cabo USB",
        categoria: "Eletrônicos",
        descricao: "Cabo USB para carregamento e transferência de dados"
    },

    {
        nome: "Camiseta Polo",
        categoria: "Vestuário",
        descricao: "Camiseta polo confeccionada em algodão"
    },
    {
        nome: "Calça Jeans",
        categoria: "Vestuário",
        descricao: "Calça jeans disponível em diversos tamanhos"
    },
    {
        nome: "Jaqueta Masculina",
        categoria: "Vestuário",
        descricao: "Jaqueta masculina para uso casual"
    },
    {
        nome: "Tênis Esportivo",
        categoria: "Vestuário",
        descricao: "Tênis confortável para atividades esportivas"
    },

    {
        nome: "Café Torrado 500g",
        categoria: "Alimentos",
        descricao: "Café torrado e moído em embalagem de 500 gramas"
    },
    {
        nome: "Água Mineral 500ml",
        categoria: "Alimentos",
        descricao: "Água mineral sem gás em embalagem de 500 ml"
    },
    {
        nome: "Arroz Tipo 1 5kg",
        categoria: "Alimentos",
        descricao: "Arroz tipo 1 em embalagem de 5 quilogramas"
    },
    {
        nome: "Feijão Carioca 1kg",
        categoria: "Alimentos",
        descricao: "Feijão carioca selecionado em embalagem de 1 quilograma"
    },
    {
        nome: "Biscoito Integral",
        categoria: "Alimentos",
        descricao: "Biscoito integral em embalagem individual"
    },

    {
        nome: "Cadeira Ergonômica",
        categoria: "Móveis",
        descricao: "Cadeira de escritório com regulagem de altura"
    },
    {
        nome: "Mesa de Escritório",
        categoria: "Móveis",
        descricao: "Mesa para escritório com estrutura reforçada"
    },
    {
        nome: "Estante de Aço",
        categoria: "Móveis",
        descricao: "Estante de aço para organização de materiais"
    },
    {
        nome: "Armário Arquivo",
        categoria: "Móveis",
        descricao: "Armário para armazenamento de documentos"
    },

    {
        nome: "Papel A4 500 Folhas",
        categoria: "Papelaria",
        descricao: "Resma de papel A4 com 500 folhas"
    },
    {
        nome: "Caneta Esferográfica",
        categoria: "Papelaria",
        descricao: "Caneta esferográfica para escrita diária"
    },
    {
        nome: "Caderno Universitário",
        categoria: "Papelaria",
        descricao: "Caderno universitário com capa resistente"
    },
    {
        nome: "Marcador Permanente",
        categoria: "Papelaria",
        descricao: "Marcador permanente para diversas superfícies"
    },

    {
        nome: "Detergente Líquido",
        categoria: "Limpeza",
        descricao: "Detergente líquido para limpeza de utensílios"
    },
    {
        nome: "Desinfetante",
        categoria: "Limpeza",
        descricao: "Desinfetante para limpeza de superfícies"
    },
    {
        nome: "Água Sanitária",
        categoria: "Limpeza",
        descricao: "Água sanitária para limpeza e desinfecção"
    },
    {
        nome: "Sabão em Pó",
        categoria: "Limpeza",
        descricao: "Sabão em pó para lavagem de roupas"
    },

    {
        nome: "Sabonete Líquido",
        categoria: "Higiene",
        descricao: "Sabonete líquido para higienização das mãos"
    },
    {
        nome: "Papel Higiênico",
        categoria: "Higiene",
        descricao: "Papel higiênico de folha dupla"
    },
    {
        nome: "Álcool em Gel",
        categoria: "Higiene",
        descricao: "Álcool em gel para higienização das mãos"
    },
    {
        nome: "Creme Dental",
        categoria: "Higiene",
        descricao: "Creme dental para higiene bucal"
    },

    {
        nome: "Martelo",
        categoria: "Ferramentas",
        descricao: "Martelo com cabo ergonômico"
    },
    {
        nome: "Chave de Fenda",
        categoria: "Ferramentas",
        descricao: "Chave de fenda em aço resistente"
    },
    {
        nome: "Alicate Universal",
        categoria: "Ferramentas",
        descricao: "Alicate universal para serviços gerais"
    },
    {
        nome: "Furadeira Elétrica",
        categoria: "Ferramentas",
        descricao: "Furadeira elétrica para uso profissional e doméstico"
    }
];

const variacoesProdutos = [
    "Profissional",
    "Executivo",
    "Premium",
    "Standard",
    "Compacto",
    "Plus",
    "Pro",
    "Advanced",
    "Essencial",
    "Corporativo"
];

const cidades = [
    ["Belo Horizonte", "MG"],
    ["São Paulo", "SP"],
    ["Rio de Janeiro", "RJ"],
    ["Brasília", "DF"],
    ["Curitiba", "PR"],
    ["Salvador", "BA"],
    ["Goiânia", "GO"],
    ["Fortaleza", "CE"],
    ["Recife", "PE"],
    ["Florianópolis", "SC"],
    ["Campinas", "SP"],
    ["Vitória", "ES"],
    ["Manaus", "AM"],
    ["Porto Alegre", "RS"],
    ["Uberlândia", "MG"],
    ["Contagem", "MG"],
    ["Betim", "MG"],
    ["Joinville", "SC"],
    ["Londrina", "PR"],
    ["Ribeirão Preto", "SP"]
];

const primeirosNomes = [
    "Carlos",
    "Mariana",
    "Ricardo",
    "Patrícia",
    "Juliana",
    "Fernando",
    "Ana",
    "João",
    "Lucas",
    "Camila",
    "Rafael",
    "Amanda",
    "Bruno",
    "Larissa",
    "Gustavo",
    "Fernanda",
    "Marcelo",
    "Renata",
    "Eduardo",
    "Beatriz"
];

const sobrenomes = [
    "Silva",
    "Souza",
    "Mendes",
    "Lima",
    "Costa",
    "Alves",
    "Oliveira",
    "Santos",
    "Pereira",
    "Rodrigues",
    "Ferreira",
    "Gomes",
    "Martins",
    "Rocha",
    "Barbosa",
    "Ribeiro",
    "Cardoso",
    "Nascimento",
    "Carvalho",
    "Moreira"
];

const fornecedoresPorCategoria = {
    Eletrônicos: [
        "Tech Brasil",
        "Digital Commerce",
        "Connect Eletrônicos",
        "Mega Informática",
        "Eletro Center",
        "Smart Tecnologia"
    ],
    Vestuário: [
        "Moda Brasil",
        "Confecções Nacional",
        "Têxtil Premium",
        "Estilo Corporativo",
        "Malharia Central",
        "Fashion Distribuidora"
    ],
    Alimentos: [
        "Alimentos Central",
        "Sabor Nacional",
        "Distribuidora Alimentar",
        "Cesta Brasil",
        "Produtos da Terra",
        "Nutri Alimentos"
    ],
    Móveis: [
        "Office Móveis",
        "Móveis Corporativos",
        "Conforto Escritório",
        "Mobília Brasil",
        "Espaço Executivo",
        "Móveis Central"
    ],
    Papelaria: [
        "Papelaria Nacional",
        "Office Suprimentos",
        "Papel e Companhia",
        "Material Escolar Brasil",
        "Distribuidora Escolar",
        "Ponto do Escritório"
    ],
    Limpeza: [
        "Limpeza Express",
        "Higieniza Brasil",
        "Produtos de Limpeza Central",
        "Clean Distribuidora",
        "Brilho Comercial",
        "Casa Limpa"
    ],
    Higiene: [
        "Higiene Total",
        "Cuidado Pessoal",
        "Saúde e Higiene",
        "Bem-Estar Distribuidora",
        "Higiene Brasil",
        "Vida Saudável"
    ],
    Ferramentas: [
        "Ferramentas Brasil",
        "Casa do Profissional",
        "Construção Express",
        "Mega Ferragens",
        "Ferramentas Central",
        "Oficina Distribuidora"
    ]
};

const complementosEmpresas = [
    "Distribuidora Ltda",
    "Comercial Ltda",
    "Atacadista Ltda",
    "Comércio e Serviços",
    "Suprimentos Ltda",
    "Importação e Distribuição"
];

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function numeroAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

function removerAcentos(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
}

function gerarCodigoBarras(indice) {
    return `7891000${String(indice).padStart(6, "0")}`;
}

function gerarCnpj(indice) {
    const bloco1 = String(10 + (indice % 89)).padStart(2, "0");
    const bloco2 = String(100 + ((indice * 7) % 899)).padStart(3, "0");
    const bloco3 = String(100 + ((indice * 13) % 899)).padStart(3, "0");
    const filial = String((indice % 9999) + 1).padStart(4, "0");
    const digito = String((indice * 17) % 100).padStart(2, "0");

    return `${bloco1}.${bloco2}.${bloco3}/${filial}-${digito}`;
}

function gerarValidade(indice) {
    const ano = 2027 + (indice % 4);
    const mes = String((indice % 12) + 1).padStart(2, "0");
    const dia = String((indice % 28) + 1).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}

function executarComando(sql, parametros = []) {
    return new Promise((resolve, reject) => {
        banco.run(sql, parametros, function (erro) {
            if (erro) {
                reject(erro);
                return;
            }

            resolve({
                id: this.lastID,
                alterados: this.changes
            });
        });
    });
}

// ======================================================
// PRODUTOS
// ======================================================

function gerarProdutos() {
    const produtos = [];

    for (let i = 1; i <= TOTAL_PRODUTOS; i++) {
        const produtoBase =
            catalogoProdutos[(i - 1) % catalogoProdutos.length];

        const variacao =
            variacoesProdutos[
                Math.floor((i - 1) / catalogoProdutos.length) %
                    variacoesProdutos.length
            ];

        const numeroModelo = String(i).padStart(4, "0");

        const possuiValidade = [
            "Alimentos",
            "Limpeza",
            "Higiene"
        ].includes(produtoBase.categoria);

        produtos.push({
            nome: `${produtoBase.nome} ${variacao} ${numeroModelo}`,
            codigo_barras: gerarCodigoBarras(i),
            descricao:
                `${produtoBase.descricao}. ` +
                `Modelo ${variacao}, referência ${numeroModelo}.`,
            quantidade: numeroAleatorio(0, 500),
            categoria: produtoBase.categoria,
            validade: possuiValidade ? gerarValidade(i) : null,
            imagem: null
        });
    }

    return produtos;
}

// ======================================================
// FORNECEDORES
// ======================================================

function gerarFornecedores() {
    const fornecedores = [];
    const categoriasDisponiveis = Object.keys(fornecedoresPorCategoria);

    for (let i = 1; i <= TOTAL_FORNECEDORES; i++) {
        const categoria =
            categoriasDisponiveis[(i - 1) % categoriasDisponiveis.length];

        const nomesDaCategoria = fornecedoresPorCategoria[categoria];

        const nomeBase =
            nomesDaCategoria[
                Math.floor((i - 1) / categoriasDisponiveis.length) %
                    nomesDaCategoria.length
            ];

        const complemento =
            complementosEmpresas[
                Math.floor(
                    (i - 1) /
                        (categoriasDisponiveis.length *
                            nomesDaCategoria.length)
                ) % complementosEmpresas.length
            ];

        const [cidade, estado] = cidades[(i - 1) % cidades.length];

        const primeiroNome =
            primeirosNomes[(i - 1) % primeirosNomes.length];

        const sobrenome =
            sobrenomes[
                Math.floor((i - 1) / primeirosNomes.length) %
                    sobrenomes.length
            ];

        const contato = `${primeiroNome} ${sobrenome}`;

        const nomeEmpresa = `${nomeBase} ${complemento} - ${cidade}`;

        const dominio = removerAcentos(`${nomeBase}${cidade}${i}`);

        fornecedores.push({
            nome: nomeEmpresa,
            cnpj: gerarCnpj(i),
            endereco:
                `Avenida Comercial, ${100 + i} - Centro - ` +
                `${cidade}/${estado}`,
            telefone:
                `(${String(11 + (i % 79)).padStart(2, "0")}) ` +
                `9${String(10000000 + i).slice(-8)}`,
            email: `contato@${dominio}.com.br`,
            contato,
            categoria
        });
    }

    return fornecedores;
}

// ======================================================
// ASSOCIAÇÕES
// ======================================================

function gerarAssociacoes(produtos, fornecedores) {
    const associacoes = [];

    produtos.forEach((produto, indiceProduto) => {
        const produtoId = indiceProduto + 1;

        const fornecedoresCompativeis = fornecedores
            .map((fornecedor, indiceFornecedor) => ({
                id: indiceFornecedor + 1,
                categoria: fornecedor.categoria
            }))
            .filter(
                fornecedor =>
                    fornecedor.categoria === produto.categoria
            );

        const quantidadeDesejada = numeroAleatorio(2, 5);

        const quantidade = Math.min(
            quantidadeDesejada,
            fornecedoresCompativeis.length
        );

        const fornecedoresEscolhidos = new Set();

        while (fornecedoresEscolhidos.size < quantidade) {
            const escolhido =
                fornecedoresCompativeis[
                    numeroAleatorio(
                        0,
                        fornecedoresCompativeis.length - 1
                    )
                ];

            fornecedoresEscolhidos.add(escolhido.id);
        }

        for (const fornecedorId of fornecedoresEscolhidos) {
            associacoes.push([produtoId, fornecedorId]);
        }
    });

    return associacoes;
}

// ======================================================
// PREENCHIMENTO DO BANCO
// ======================================================

async function preencherBanco() {
    const produtos = gerarProdutos();
    const fornecedores = gerarFornecedores();
    const associacoes = gerarAssociacoes(produtos, fornecedores);

    try {
        await executarComando("PRAGMA foreign_keys = ON");
        await executarComando("BEGIN TRANSACTION");

        console.log("Limpando dados antigos...");

        await executarComando("DELETE FROM produto_fornecedor");
        await executarComando("DELETE FROM produtos");
        await executarComando("DELETE FROM fornecedores");

        await executarComando(`
            DELETE FROM sqlite_sequence
            WHERE name IN (
                'produto_fornecedor',
                'produtos',
                'fornecedores'
            )
        `);

        console.log("Cadastrando 1.000 produtos...");

        for (const produto of produtos) {
            await executarComando(
                `
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
                `,
                [
                    produto.nome,
                    produto.codigo_barras,
                    produto.descricao,
                    produto.quantidade,
                    produto.categoria,
                    produto.validade,
                    produto.imagem
                ]
            );
        }

        console.log("Cadastrando 200 fornecedores...");

        for (const fornecedor of fornecedores) {
            await executarComando(
                `
                INSERT INTO fornecedores (
                    nome,
                    cnpj,
                    endereco,
                    telefone,
                    email,
                    contato
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [
                    fornecedor.nome,
                    fornecedor.cnpj,
                    fornecedor.endereco,
                    fornecedor.telefone,
                    fornecedor.email,
                    fornecedor.contato
                ]
            );
        }

        console.log("Criando associações...");

        for (const [produtoId, fornecedorId] of associacoes) {
            await executarComando(
                `
                INSERT INTO produto_fornecedor (
                    produto_id,
                    fornecedor_id
                )
                VALUES (?, ?)
                `,
                [produtoId, fornecedorId]
            );
        }

        await executarComando("COMMIT");

        console.log("");
        console.log("✅ Banco preenchido com sucesso!");
        console.log(`📦 ${produtos.length} produtos cadastrados.`);
        console.log(`🏭 ${fornecedores.length} fornecedores cadastrados.`);
        console.log(`🔗 ${associacoes.length} associações cadastradas.`);
    } catch (erro) {
        console.error("❌ Erro ao preencher o banco:", erro.message);

        try {
            await executarComando("ROLLBACK");
        } catch (erroRollback) {
            console.error(
                "Erro ao desfazer transação:",
                erroRollback.message
            );
        }

        process.exitCode = 1;
    } finally {
        banco.close();
    }
}

preencherBanco();
