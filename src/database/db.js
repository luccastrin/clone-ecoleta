//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose();

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

// utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
	//Criar uma tabela com comandos sql
	// db.run(`
	//     CREATE TABLE IF NOT EXISTS places (
	//         id INTEGER PRIMARY KEY AUTOINCREMENT,
	//         name TEXT,
	//         image TEXT,
	//         address TEXT,
	//         address2 TEXT,
	//         state TEXT,
	//         city TEXT,
	//         items TEXT
	//     );
	// `);
	// //Inserir dados na tabelac
	// const query = `
	//     INSERT INTO places(
	//         name,
	//         image,
	//         address,
	//         address2,
	//         state,
	//         city,
	//         items
	//     ) VALUES(?, ?, ?, ?, ?, ?, ?);
	// `;
	// const values = [
	// 	"Colectoria",
	// 	"https://unsplash.it/600/400?image=1000",
	// 	"Guilherme Gemballa,  Jardim América",
	// 	"Nº 260",
	// 	"Santa Catarina",
	// 	"Rio do Sul",
	// 	"Residuos Eletrônicos, Lâmpadas",
	// ];
	// function afterInsertData(error) {
	// 	if (error) {
	// 		return console.log(error);
	// 	}
	// 	console.log("cadastrado com sucesso!!");
	// 	console.log(this);
	// }
	// db.run(query, values, afterInsertData);
	// // Consultar os dados da tabela
	// db.all(`SELECT * FROM places`, function (error, rows) {
	// 	if (error) {
	// 		return console.log(error);
	// 	}
	// 	console.log("Aqui estão seus registros: ");
	// 	console.log(rows);
	// });
	// Deletar um dado da tabela
	// db.run(`DELETE FROM places WHERE id = ?`, [8], function (error) {
	// 	if (error) {
	// 		return console.log(error);
	// 	}
	// 	console.log("Registro deletado com sucesso");
	// });
});
