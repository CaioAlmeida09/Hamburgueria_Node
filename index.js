const express = require("express")
const app = express()
const uuid = require("uuid")
app.use(express.json())
app.listen(3000)

const pedidos = []
const pedidEspc = []
app.post('/pedido', (request, response) => {
    const firstpedido = request.body
    const newped = {id: uuid.v4(),firstpedido }
    pedidos.push(newped)
    return response.status(201).json(newped)
})
app.get('/pedidos', (request, response) => {
    return response.json(pedidos)
})

app.put('/alteration/:id', (request, response) => {
    const { id } = request.params
    const Mudanca = request.body
    const pedidmudado = { id, Mudanca }
    const position = pedidos.findIndex(index => index.id === id)
    if (position < 0) {
        return response.status(404).json({ "message": "Id not encontrado" })
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
    return response.status(204).send()
})

app.listen(3001)
app.get('/pedidos/:id', (request, response) => {
    const { id } = request.params
    const position = pedidos.findIndex(index => index.id === id)
    if (position < 0) {
        return response.status(404).json({ "message": "Id não encontrado" })
    }
    pedidEspc.push(pedidos[position]) 
    return response.json(pedidEspc)
})

app.patch('/status/:id', (request,response)=>{
    const { id } = request.params
    const position = pedidos.findIndex(index => index.id === id)
    if (position < 0) {
        return response.status(404).json({ "message": "Id não encontrado" })
    }
    const Newstatus = pedidos[position] 
    Newstatus["status"]= "Pronto"
    return response.status(201).json()
})