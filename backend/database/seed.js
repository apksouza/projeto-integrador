const banco = require("./conexao");

const produtos = [
    {
        nome: "Notebook Dell Inspiron 15",
        codigo_barras: "7891000000001",
        descricao: "Notebook Intel Core i5, 16 GB de RAM e SSD de 512 GB.",
        quantidade: 15,
        categoria: "Eletrônicos",
        validade: null,
        imagem: null
    },
    {
        nome: "Monitor Samsung 24 Polegadas",
        codigo_barras: "7891000000002",
        descricao: "Monitor Full HD com conexão HDMI e painel IPS.",
        quantidade: 28,
        categoria: "Eletrônicos",
        validade: null,
        imagem: null
    },
    {
        nome: "Teclado Mecânico RGB",
        codigo_barras: "7891000000003",
        descricao: "Teclado mecânico com iluminação RGB e conexão USB.",
        quantidade: 42,
        categoria: "Eletrônicos",
        validade: null,
        imagem: null
    },
    {
        nome: "Mouse Sem Fio",
        codigo_barras: "7891000000004",
        descricao: "Mouse óptico sem fio com receptor USB.",
        quantidade: 65,
        categoria: "Eletrônicos",
        validade: null,
        imagem: null
    },
    {
        nome: "Camiseta Polo Empresarial",
        codigo_barras: "7891000000005",
        descricao: "Camiseta polo em algodão, disponível em vários tamanhos.",
        quantidade: 90,
        categoria: "Vestuário",
        validade: null,
        imagem: null
    },
    {
        nome: "Café Torrado 500g",
        codigo_barras: "7891000000006",
        descricao: "Café torrado e moído, embalagem com 500 gramas.",
        quantidade: 120,
        categoria: "Alimentos",
        validade: "2027-12-30",
        imagem: null
    },
    {
        nome: "Água Mineral 500ml",
        codigo_barras: "7891000000007",
        descricao: "Água mineral sem gás em garrafa de 500 ml.",
        quantidade: 240,
        categoria: "Alimentos",
        validade: "2027-06-30",
        imagem: null
    },
    {
        nome: "Cadeira Ergonômica Executiva",
        codigo_barras: "7891000000008",
        descricao: "Cadeira para escritório com regulagem de altura e apoio lombar.",
        quantidade: 18,
        categoria: "Outro",
        validade: null,
        imagem: null
    }
];

const fornecedores = [
    {
        nome: "Tech Distribuidora Ltda",
        cnpj: "12.345.678/0001-90",
        endereco: "Rua das Empresas, 100 - Brasília/DF",
        telefone: "(61) 3333-4444",
        email: "contato@techdistribuidora.com",
        contato: "Carlos Silva"
    },
    {
        nome: "Digital Commerce Brasil",
        cnpj: "23.456.789/0001-01",
        endereco: "Avenida Paulista, 1500 - São Paulo/SP",
        telefone: "(11) 3333-5555",
        email: "vendas@digitalcommerce.com",
        contato: "Mariana Souza"
    },
    {
        nome: "Office Móveis Corporativos",
        cnpj: "34.567.890/0001-12",
        endereco: "Rua do Comércio, 420 - Goiânia/GO",
        telefone: "(62) 3222-4400",
        email: "atendimento@officemoveis.com",
        contato: "Ricardo Mendes"
    },
    {
        nome: "Alimentos Central Ltda",
        cnpj: "45.678.901/0001-23",
        endereco: "Avenida Industrial, 230 - Curitiba/PR",
        telefone: "(41) 3444-5500",
        email: "pedidos@alimentoscentral.com",
        contato: "Patrícia Lima"
    },
    {
        nome: "Moda Brasil Confecções",
        cnpj: "56.789.012/0001-34",
        endereco: "Rua das Confecções, 80 - Blumenau/SC",
        telefone: "(47) 3555-6600",
        email: "comercial@modabrasil.com",
        contato: "Juliana Costa"
    },
    {
        nome: "Suprimentos Express",
        cnpj: "67.890.123/0001-45",
        endereco: "Avenida Logística, 910 - Belo Horizonte/MG",
        telefone: "(31) 3666-7700",
        email: "vendas@suprimentosexpress.com",
        contato: "Fernando Alves"
    }
];

const associacoes = [
    [1, 1],
    [1, 2],
    [2, 1],
    [2, 2],
    [3, 1],
    [3, 6],
    [4, 2],
    [4, 6],
    [5, 5],
    [6, 4],
    [6, 6],
    [7, 4],
    [8, 3],
    [8, 6]
];

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

async function preencherBanco() {
    try {
        await executarComando("PRAGMA foreign_keys = ON");

        console.log("Limpando dados antigos...");

        await executarComando("DELETE FROM produto_fornecedor");
        await executarComando("DELETE FROM produtos");
        await executarComando("DELETE FROM fornecedores");

        await executarComando(
            "DELETE FROM sqlite_sequence WHERE name = 'produto_fornecedor'"
        );

        await executarComando(
            "DELETE FROM sqlite_sequence WHERE name = 'produtos'"
        );

        await executarComando(
            "DELETE FROM sqlite_sequence WHERE name = 'fornecedores'"
        );

        console.log("Cadastrando produtos...");

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

        console.log("Cadastrando fornecedores...");

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

        console.log("");
        console.log("Banco preenchido com sucesso!");
        console.log(`${produtos.length} produtos cadastrados.`);
        console.log(`${fornecedores.length} fornecedores cadastrados.`);
        console.log(`${associacoes.length} associações cadastradas.`);

        banco.close();
    } catch (erro) {
        console.error("Erro ao preencher o banco:", erro.message);
        banco.close();
        process.exitCode = 1;
    }
}

preencherBanco();