const express = require("express")
const app = express()
const uuid = require("uuid")
app.use(express.json())

app.listen(3000)

const pedidos = []
app.post('/pedido', (request, response)=>{
    const {order, batatas, clientName,coca, price, status} = request.body
    const newped =  {id: uuid.v4(), order, batatas, clientName,coca, price, status}
    pedidos.push(newped)
    return response.status(201).json(newped)
})
app.get('/pedidos', (request, response)=>{
return response.json(pedidos)
})