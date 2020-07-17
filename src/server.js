const express = require("express");
const server = express();

//Referenciar o banco de dados
const db = require("./database/db");

//configurar pasta client(para ter acesso aos arquivos css e js)
server.use(express.static("client"));

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}));

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
	//req.query: query strings da url

	return res.render("cadastro.html");
});

server.post("/savepoint", (req, res) => {
	//req.body: corpo do formulário
	// console.log(req.body);

	//inserir dados no banco de dados
	const query = `
	    INSERT INTO places(
	        name,
	        image,
	        address,
	        address2,
	        state,
	        city,
	        items
	    ) VALUES(?, ?, ?, ?, ?, ?, ?);
	`;
	const values = [
		req.body.name,
		req.body.image,
		req.body.address,
		req.body.address2,
		req.body.state,
		req.body.city,
		req.body.items,
	];
	function afterInsertData(error) {
		if (error) {
			return console.log(error);
		}
		console.log("cadastrado com sucesso!!");
		console.log(this);

		return res.render("cadastro.html", {saved: true});
	}

	db.run(query, values, afterInsertData);
});

server.get("/lista", (req, res) => {
	const lista = req.query.search;

	if (lista == "") {
		//Pesquisa vazia
		return res.render("lista.html", {total: 0});
	}

	//Trazer os dados do banco de dados para inserir na página lista
	db.all(`SELECT * FROM places WHERE city LIKE '%${lista}%'`, function (
		error,
		rows
	) {
		if (error) {
			return console.log(error);
		}
		console.log(rows);

		const total = rows.length;

		//Mostrar a página htlm com os dados do banco de dados
		return res.render("lista.html", {places: rows, total: total});
	});
});

//acionar o servidor
server.listen(3000);
