const express = require('express')
const app = express()
const port = 3000
const config = {
	host: 'db',
	user: 'root',
	password: 'root',
	database: 'nodedb'
};
const mysql = require('mysql')

function getConnection() {
	const connection = mysql.createConnection(config)
	return connection;
}

function inserirPeople() {
	var date = new Date();
	var dia = String(date.getDate()).padStart(2, '0');
	var mes = String(date.getMonth() + 1).padStart(2, '0');
	var ano = date.getFullYear();
	var hora = String(date.getHours()).padStart(2, '0');
	var minuto = String(date.getMinutes()).padStart(2, '0');
	var segundo = String(date.getSeconds()).padStart(2, '0');

	var dataAtual = dia + '/' + mes + '/' + ano;
	dataAtual += " " + hora + ":" + minuto + ":" + segundo;

	var name = "Luiz Carlos - " + dataAtual;
	const sql = `INSERT into people(name) values('${name}')`
	var connection = getConnection();
	connection.query(sql)
	connection.end()
	console.log("Inseriu Pessoa")
}

function getPeoples(req, res) {
	const sql = `SELECT id, name FROM people ORDER BY id ASC`
	let connection = getConnection();

	connection.query(sql, function (err, rows) {
		var resultado = '<h1>Full Cycle Rocks 2!</h1>';

		if (err) {
			console.log("Erro ao buscar dados: " + err);
			resultado += '<h3>Erro ao buscar dados: ' + err + '</h1>';

		} else {
			let peoples = `<table style="width:50%"><tr><th align="left" style="width:30%">Código</th><th align="left" style="width:70%">Name</th></tr>`;
			if (rows != null) {
				Object.keys(rows).forEach(function(key) {
					var row = rows[key];
					console.log(row.id + "-" + row.name)
					peoples += `<tr><td align="left" style="width:30%">${row.id}</td><td align="left" style="width:730%">${row.name}</td></tr>`;
				});
			}
			resultado += peoples + "</table>";
		}
		console.log("getPeoples: " + resultado);
		connection.end();
		res.send(resultado)
	});
}

inserirPeople();

app.get('/', (req, res) => {
	getPeoples(req, res);
})

app.listen(port, ()=> {
	console.log('Rodando na porta ' + port)
})