const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const caminhoBanco = path.resolve(__dirname, "estoque.sqlite");

const banco = new sqlite3.Database(caminhoBanco, (erro) => {
    if (erro) {
        console.error("Erro ao conectar com o banco de dados:", erro.message);
        return;
    }

    console.log("Conectado ao banco SQLite.");
});

banco.run("PRAGMA foreign_keys = ON");

module.exports = banco;