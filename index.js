const express = require("express");
const app = express();
const uuid = require("uuid");
app.use(express.json());
const cors = require('cors')
app.use(cors())

const pedidos = [];
const pedidEspc = [];

const midle = (request, response, next) => {
  const { id } = request.params;
  const position = pedidos.findIndex((pedido) => pedido.id === id);
  if (position < 0) {
    return response.status(404).json({ message: "Id não encontrado" });
  }
  request.userPosition = position;
  request.userID = id;
  next();
};

const midleTwo = (request, response, next) => {
  const met = request.method;
  const url = request.url;
  console.log(`method = ${met} e a nossa url é ${url}`);
  next();
};

app.post("/pedido", midleTwo, (request, response) => {
  const {name , ...mypedido} = request.body;
  const newped = { id: uuid.v4(), name, ...mypedido};
  pedidos.push(newped);
  return response.status(201).json(newped);
});

app.get("/pedidos", (request, response) => {
  return response.json(pedidos);
});

app.put("/alteration/:id", midle, (request, response) => {
  const Mudanca = request.body;
  const id = request.userID;
  const position = request.userPosition;
  const pedidmudado = { id, Mudanca };
  pedidos[position] = pedidmudado;
  return response.send("alterado");
});

app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  const position = pedidos.findIndex((index) => index.id === id);
  if (position < 0) {
    return response.status(404).json({ message: "Id não encontrado" });
  }
  pedidos.splice(position, 1);
  return response.status(204).send();
});

app.get("/pedidos/:id", midle, (request, response) => {
  const id = request.userID;
  const position = request.userPosition;
  pedidEspc.push(pedidos[position]);
  return response.json(pedidEspc);
});

app.patch("/status/:id", (request, response) => {
  const { id } = request.params;
  const position = pedidos.findIndex((index) => index.id === id);
  if (position < 0) {
    return response.status(404).json({ message: "Id não encontrado" });
  }
  const Newstatus = pedidos[position];
  Newstatus["status"] = "Pronto";
  return response.json(Newstatus);
});

app.listen(3001);
