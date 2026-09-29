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

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    let indice = -1
    itens.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        itens[indice] = dados
        res.status(202).json(dados)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    let indice = -1
    itens.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        itens[indice].status = "Registro excluído"
        const excluido = itens[indice]
        itens.splice(indice, 1)
        res.json(excluido)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir
}