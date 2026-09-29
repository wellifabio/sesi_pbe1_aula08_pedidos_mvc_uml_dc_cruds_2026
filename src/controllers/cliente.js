const clientes = require("../../dados/clientes.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(clientes[clientes.length - 1].id) + 1 //autoIncrement
    clientes.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(clientes)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    clientes.forEach((c, i) => {
        if (c.id == id) {
            dados.id = id
            clientes[i] = dados
            res.status(202).json(dados)
        }
    })
    res.status(404).json("Id não encontrado")
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    clientes.forEach((c, i) => {
        if (c.id == id) {
            clientes[i].status = "Registro excluído"
            const excluido = clientes[i]
            clientes.splice(i, 1)
            res.json(excluido)
        }
    })
    res.status(404).json("Id não encontrado")
}

module.exports = {
    criar, listar, alterar, excluir
}