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

let peoples = `<table style="width:50%"><tr><th align="left" style="width:30%">Código</th><th align="left" style="width:70%">Name</th></tr>`;

function getConnection() {
	const connection = mysql.createConnection(config)
	return connection;
}

function inserirPeople() {
	var date = new Date();
	var name = "Luiz Carlos - " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
	name += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

	const sql = `INSERT into people(name) values('${name}')`
	console.log("INSERT: " + sql)
	var connection = getConnection();
	connection.query(sql)
	connection.end()
}

function buscarPeople() {
	const sql = `SELECT id, name FROM people ORDER BY id ASC`
	var connection = getConnection();
	connection.query(sql, function (err, rows) {
		if (err) throw err;
		Object.keys(rows).forEach(function(key) {
			var row = rows[key];
			console.log(row.id + "-" + row.name)
			peoples += `<tr><td align="left" style="width:30%">${row.id}</td><td align="left" style="width:730%">${row.name}</td></tr>`;
		});
	});
}

inserirPeople();
buscarPeople();

app.get('/', (req, res) => {
	var resultado = '<h1>Full Cycle Rocks 2!</h1>';
	resultado += peoples + "</table>";
	console.log('Dados ' + resultado)
	res.send(resultado)
})

app.listen(port, ()=> {
	console.log('Rodando na porta ' + port)
})