const express = require("express")
const app = express()
const uuid = require("uuid")
app.use(express.json())

app.listen(3000)

app.post('/pedido', (request, response)=>{
    const {order, batatas, clientName,coca, price, status} = request.body
    const newped =  {id: uuid.v4(), order, batatas, clientName,coca, price, status}
    response.status(201).json(newped)
})