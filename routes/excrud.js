const express = require('express')

const router = express.Router()

let listaPessoas = [
    {
        id: 1,
        nome: "João",
        idade: 20,
        email: "joão@email.com",
        telefone: "61900010002"
    },
    {
        id: 2,
        nome: "oão",
        idade: 20,
        email: "oão@email.com",
        telefone: "61922010332"
    }
]

function validarpessoa(req, res, next) {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
    const index = listaPessoas.findIndex(pessoa => pessoa.id == id)
    if (pessoa) {
        res.pessoa = pessoa
        res.index = index
        return next()
    }
    return res.status(404).json({ mensagem: "Não encontrato!" })
}
function validaratributos(req, res, next) {
    const dados = req.body
    if (!dados.nome || !dados.idade || !dados.email || !dados.telefone) {
        return res.status(400).json({ mensagem: "Preencha todos os campos!" })
    }
    return next()
}
//Recuperar todas as pessoas.
router.get('/pessoa', (req, res) => {
    res.json(listaPessoas)
})

//Recuperar uma pessoa específica por meio de seu identificador.
router.get('/pessoa/:id', (req, res) => {
    const id = req.params.id
    const pessoa = listaPessoas.find(pessoa => pessoa.id == id)
    if (pessoa) {
        return res.json(pessoa)
    }
    return res.status(404).json({ mensagem: "Pessoa não encontrato!" })
})

//- Adicionar uma nova pessoa.
router.post('/pessoa', validaratributos, (req, res) => {
    const dados = req.body

    console.log(req.body)

    const pessoa = {
        id: Math.round(Math.random() * 1000),
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaPessoas.push(pessoa)

    res.json({
        mensagem: "Cadastrado com sucesso!",
        pessoa: pessoa
    })
})

//Atualizar uma pessoa existente com base em seu identificador.
router.put('/pessoa/:id', validaratributos, validarpessoa, (req, res) => {
    const dados = req.body

    const pessoaAtualizado = {
        id: req.pessoa.id,
        nome: dados.nome,
        idade: dados.idade,
        email: dados.email,
        telefone: dados.telefone
    }

    listaPessoas[res.index] = pessoaAtualizado

    res.json({
        mensagem: "Pessoa atualizado com sucesso!",
        pessoa: pessoaAtualizado
    })
})

//Remover uma tarefa da lista com base em seu identificador
router.delete('/pessoa/:id', validarpessoa, (req, res) => {
    listaPessoas.splice(res.index, 1)
    res.json({ mensagem: "Pessoa excluído com sucesso!" })
})



module.exports = router