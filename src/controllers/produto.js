const pedidos = require("../../dados/pedidos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    res.json(pedidos)
}
const alterar = (req, res) => { }
const excluir = (req, res) => { }

module.exports = {
    criar, listar, alterar, excluir
}