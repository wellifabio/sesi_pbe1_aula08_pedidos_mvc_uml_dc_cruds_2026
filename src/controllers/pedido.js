const pedidos = require("../../dados/pedidos.json")
const clientes = require("../../dados/clientes.json")
const itens = require("../../dados/itens.json")

//Composição
function comporCliente() {
    pedidos.forEach(p => {
        p.cliente = clientes.find(c => c.id == p.id)
    })
}

//Agregação
function agregarItens() {
    pedidos.forEach(p => {
        p.itens = itens.filter(item => item.pedido_id == p.id)
    })
}

function totais() {
    pedidos.forEach(p => {
        p.total = 0
        p.itens.forEach(item=>{
            item.subtotal = item.quantidade * item.preco
            p.total += item.subtotal
        })
    })
}

//CRUDS
const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    comporCliente()
    agregarItens()
    totais()
    res.json(pedidos)
}

const buscarPorId = (req, res) => {
    comporCliente()
    agregarItens()
    totais()
    const filtrado = pedidos.find(p => p.id == req.params.id)
    if (filtrado) res.json(filtrado)
    else res.status(404).json("Id não encontrado")
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    let indice = -1
    pedidos.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        pedidos[indice] = dados
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
    pedidos.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        chaves.forEach(c => {
            pedidos[indice][c] = dados[c]
        })
        res.status(202).json(pedidos[indice])
    } else {
        res.status(404).json("Id não encontrado")
    }
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    let indice = -1
    pedidos.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        pedidos[indice].status = "Registro excluído"
        const excluido = pedidos[indice]
        pedidos.splice(indice, 1)
        res.json(excluido)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir, buscarPorId, alterarParcial
}