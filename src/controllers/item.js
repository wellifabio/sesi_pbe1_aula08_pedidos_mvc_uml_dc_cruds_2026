const itens = require("../../dados/itens.json")
const produtos = require("../../dados/produtos.json")

//Composição
function comporProduto() {
    itens.forEach(item => {
        item.produto = produtos.find(p => p.id == item.produto_id)
    })
}

//Calcular subtotais
function subotais() {
    itens.forEach(item => {
        item.subtotal = item.quantidade * item.preco
    })
}

//CRUDs
const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(itens[itens.length - 1].id) + 1 //autoIncrement
    itens.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    comporProduto()
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

const alterarParcial = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    const chaves = Object.keys(req.body)
    let indice = -1
    itens.forEach((item, i) => {
        if (item.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        chaves.forEach(c => {
            itens[indice][c] = dados[c]
        })
        res.status(202).json(itens[indice])
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
    criar, listar, alterar, excluir, alterarParcial
}