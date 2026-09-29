const itens = require("../../dados/itens.json")

function subotais() {
    itens.forEach(item => {
        item.subtotal = item.quantidade * item.preco
    })
}
const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(itens[itens.length - 1].id) + 1 //autoIncrement
    itens.push(dados)
    res.status(201).json(dados)
}
const listar = (req, res) => {
    subotais()
    res.json(itens)
}
const alterar = (req, res) => { }
const excluir = (req, res) => { }

module.exports = {
    criar, listar, alterar, excluir
}