const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const hostname = '127.0.0.1';
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo.db';

app.use(express.json());


app.post('/insereFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); 
	 sql = `INSERT INTO formacao (nome_do_curso,periodo,descricao) VALUES ('${req.body.nome_do_curso}', '${req.body.periodo}','${req.body.descricao}')`;
	 console.log(sql);
	 db.run(sql, [],  err => {
	 	if (err) {
	 	    throw err;
	 	}
	 	res.send();
	 });
	 db.close();
	 
});


app.get('/listaFormacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM formacao';
	console.log(sql)
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});


app.get('/atualizaFormacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	 var sql = "SELECT nome_do_curso,periodo,descricao FROM formacao WHERE cursos ="+ req.query.cursos;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH);
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
});

app.post('/atualizaFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var sql = `UPDATE formacao SET nome_do_curso = '${req.body.nome_do_curso}', periodo = '${req.body.periodo}', descricao = '${req.body.descricao}'  WHERE cursos = '${req.body.cursos}'`;
	console.log(sql)
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close();
});


app.get('/removeFormacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var sql = `DELETE FROM formacao WHERE cursos='${req.query.cursos}'`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); 
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.send();
	});
	db.close();
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
