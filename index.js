const express = require("express")
const app = express()
const uuid = require("uuid")
app.use(express.json())

app.listen(3000)

const pedidos = []
app.post('/pedido', (request, response) => {
    const { order, batatas, clientName, coca, price, status } = request.body
    const newped = { id: uuid.v4(), order, batatas, clientName, coca, price, status }
    pedidos.push(newped)
    return response.status(201).json(newped)
})
app.get('/pedidos', (request, response) => {
    return response.json(pedidos)
})

app.put('/alteration/:id', (request, response) => {
    const { id } = request.params
    const { batata, order } = request.body
    const pedidmudado = { id, batata, order }
    const position = pedidos.findIndex(index => index.id === id)
    if (position < 0) {
        return response.status(404).json({ "message": "Id não encontrado" })
    }
    pedidos[position] = pedidmudado
    return response.send("alterado")
})

app.delete('/delete/:id' ,(request, response)=>{
    const { id } = request.params
    const position = pedidos.findIndex(index => index.id === id)
    if (position < 0) {
        return response.status(404).json({ "message": "Id não encontrado" })
    }
    pedidos.splice(position, 1)
    return response.status(204).json({"message":"Não encontrado"})
})