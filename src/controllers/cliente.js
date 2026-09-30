const clientes = require("../../dados/clientes.json")

//CRUDS
const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(clientes[clientes.length - 1].id) + 1 //autoIncrement
    clientes.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(clientes)
}

const buscarPorId = (req, res) => {
    const filtrado = clientes.find(c => c.id == req.params.id)
    if (filtrado) res.json(filtrado)
    else res.status(404).json("Id não encontrado")
}

const buscarPorNome = (req, res) => {
    const filtrados = clientes.filter(c => c.nome.toUpperCase().includes(req.params.nome.toUpperCase()))
    if (filtrados.length > 0) res.json(filtrados)
    else res.status(404).json("Nome não encontrado")
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body
    let indice = -1
    clientes.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        dados.id = id
        clientes[indice] = dados
        res.status(202).json(dados)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

const excluir = (req, res) => {
    const id = Number(req.params.id)
    let indice = -1
    clientes.forEach((p, i) => {
        if (p.id == id) {
            indice = i
        }
    })
    if (indice != -1) {
        clientes[indice].status = "Registro excluído"
        const excluido = clientes[indice]
        clientes.splice(indice, 1)
        res.json(excluido)
    } else {
        res.status(404).json("Id não encontrado")
    }
}

module.exports = {
    criar, listar, alterar, excluir, buscarPorId, buscarPorNome
}