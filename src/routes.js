const express = require("express")
const router = express.Router()

const Cliente = require("./controllers/cliente")
const Pedido = require("./controllers/pedido")
const Item = require("./controllers/item")
const Produto = require("./controllers/produto")

const rotaInicial = (req, res) => {
    res.json("Pedidos MVC respondendo")
}

router.get('/', rotaInicial)

router.post('/clientes', Cliente.criar)
router.get('/clientes', Cliente.listar)
router.get('/clientes/:id', Cliente.buscarPorId)
router.get('/clientes/nome/:nome', Cliente.buscarPorNome)
router.put('/clientes/:id', Cliente.alterar)
router.patch('/clientes/:id', Cliente.alterarParcial)
router.delete('/clientes/:id', Cliente.excluir)

router.post('/pedidos', Pedido.criar)
router.get('/pedidos', Pedido.listar)
router.get('/pedidos/:id', Pedido.buscarPorId)
router.put('/pedidos/:id', Pedido.alterar)
router.patch('/pedidos/:id', Pedido.alterarParcial)
router.delete('/pedidos/:id', Pedido.excluir)

router.post('/itens', Item.criar)
router.get('/itens', Item.listar)
router.put('/itens/:id', Item.alterar)
router.patch('/itens/:id', Item.alterarParcial)
router.delete('/itens/:id', Item.excluir)

router.post('/produtos', Produto.criar)
router.get('/produtos', Produto.listar)
router.put('/produtos/:id', Produto.alterar)
router.patch('/produtos/:id', Produto.alterarParcial)
router.delete('/produtos/:id', Produto.excluir)

module.exports = router