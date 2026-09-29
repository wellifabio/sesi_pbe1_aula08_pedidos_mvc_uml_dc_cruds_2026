const pedidos = require("../../dados/pedidos.json")
const clientes = require("../../dados/clientes.json")
const itens = require("../../dados/itens.json")

function comporPedidos() {
    pedidos.forEach(p => {
        p.cliente = clientes.find(c => c.id == p.id)
    })
}

function agregarItens() {
    pedidos.forEach(p => {
        const itensPedido = itens.filter(item => item.pedido_id == p.id)
        let total = 0
        itensPedido.forEach(item => {
            item.subtotal = item.quantidade * item.preco
            total += item.subtotal
        })
        p.itens = itensPedido
        p.total = total
    })
}

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1 //autoIncrement
    pedidos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    comporPedidos()
    agregarItens()
    res.json(pedidos)
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
    criar, listar, alterar, excluir
}