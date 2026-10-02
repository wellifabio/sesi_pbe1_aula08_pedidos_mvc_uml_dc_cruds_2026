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
    let indice = -1
    produtos.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        produtos[indice] = dados
        res.status(202).json(dados)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

const alterarParcial = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    const chaves = Object.keys(req.body)
    let indice = -1
    produtos.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        chaves.forEach(c => {
            produtos[indice][c] = dados[c]
        })
        res.status(202).json(produtos[indice])
    } else {
        res.status(404).json("Id não encontrado")
    }
}


const excluir = (req, res) => {
    const id = Number(req.params.id)
    let indice = -1
    produtos.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        produtos[indice].status = "Registro excluído"
        const excluido = produtos[indice]
        produtos.splice(indice, 1)
        res.json(excluido)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir, alterarParcial
}