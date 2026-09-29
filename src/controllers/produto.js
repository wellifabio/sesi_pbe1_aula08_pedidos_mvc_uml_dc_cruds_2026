const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(produtos[produtos.length - 1].id) + 1 //autoIncrement
    produtos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(produtos)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    produtos.forEach((p, i) => {
        if (p.id == id) {
            dados.id = id
            produtos[i] = dados
            res.status(202).json(dados)
        }
    })
    res.status(404).json("Id não encontrado")
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    produtos.forEach((p, i) => {
        if (p.id == id) {
            produtos[i].status = "Registro excluído"
            const excluido = produtos[i]
            produtos.splice(i, 1)
            res.json(excluido)
        }
    })
    res.status(404).json("Id não encontrado")
}

module.exports = {
    criar, listar, alterar, excluir
}