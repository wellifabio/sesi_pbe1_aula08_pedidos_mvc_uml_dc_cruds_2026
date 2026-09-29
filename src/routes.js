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
router.get('/clientes', Cliente.listar)
router.get('/pedidos', Pedido.listar)
router.get('/itens', Item.listar)
router.get('/produtos', Produto.listar)
router.post('/clientes', Cliente.criar)
router.post('/pedidos', Pedido.criar)
router.post('/pedidos', Item.criar)
router.post('/pedidos', Produto.criar)

module.exports = router