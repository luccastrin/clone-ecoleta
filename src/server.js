const express = require("express");
const server = express();

//configurar pasta client(para ter acesso aos arquivos css e js)
server.use(express.static("client"));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
	express: server,
	noCache: true,
});

//configurar endpoints da aplicação
server.get("/", (req, res) => {
	return res.render("index.html");
});

server.get("/cadastro", (req, res) => {
	return res.render("cadastro.html");
});

server.get("/lista", (req, res) => {
	return res.render("lista.html");
});

//acionar o servidor
server.listen(3000);
