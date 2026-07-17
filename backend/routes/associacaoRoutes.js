const express = require("express");
const associacaoController = require("../controllers/associacaoController");

const router = express.Router();

router.post("/", associacaoController.associarFornecedor);
router.get("/", associacaoController.listarAssociacoes);

router.get(
    "/produto/:produtoId/fornecedores",
    associacaoController.listarFornecedoresPorProduto
);

router.get(
    "/fornecedor/:fornecedorId/produtos",
    associacaoController.listarProdutosPorFornecedor
);

router.delete(
    "/produto/:produtoId/fornecedor/:fornecedorId",
    associacaoController.desassociarFornecedor
);

module.exports = router;