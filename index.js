const express = require('express')
const app = express()

const gerenciamentoRouter = require('./routes/excrud')
app.use(gerenciamentoRouter)

function gerenciamento(req, res, next){
    console.log("A requisição passou aqui")
    next()
}

function gerenciamento2(req, res, next){
    console.log("A requisição travou")
    return res.status(400).json({ mensagem: "Travado!!"})
}

app.get('/hello', gerenciamento, (req, res) => {
    res.json("hello")
})

app.get('/teste', gerenciamento, gerenciamento2, (req, res) => {
    res.json("teste")
})

app.listen(3000,() => {
    console.log("Aplicação rodando em http://localhost:3000")
})