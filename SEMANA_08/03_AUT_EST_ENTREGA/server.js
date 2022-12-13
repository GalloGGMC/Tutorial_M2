const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo.db';
const path = require('path');

app.use(express.static("./front"))

app.use("/", express.static(path.join(__dirname, "./front"), {
    // Aqui estamos configurando o cache dos arquivos estáticos... Muito
    // útil em ambientes de produção, mas deve-se ter cuidado durante a
    // fase de desenvolvimento.
    cacheControl: false,
    etag: false,
    maxAge: "30d"
}));
app.use(express.json());

app.get('/curriculo', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT nome_da_realizacao, anos, descricao, realizacao FROM realizacoes WHERE id=1';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
    // res.sendFile("C:/Users/Inteli/Documents/GitHub/Tutorial_M2/SEMANA_07/03_AUT_EST_ENTREGA/Currículo/front/index.html");
});

app.post('/novaReal', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO realizacoes (id, nome_da_realizacao, anos, cargo, descricao) VALUES (1, "${req.body.nome}", "${req.body.ano}","${req.body.cargo}", "${req.body.descricao}")`;
	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		
	});
	res.write('<p>Realizacao inserida com sucesso!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

app.get('/removeReal', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "DELETE FROM realizacoes WHERE realizacao='" + req.query.realizacao + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.write('<p>Realizacao removida com sucesso!</p><a href="/">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});


app.get('/atualizaRea',urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = `SELECT nome_da_realizacao, anos, descricao, realizacao FROM realizacoes WHERE realizacao=${req.query.realizacao}`;
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});



// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaRea', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	sql = "UPDATE realizacoes SET nome_da_realizacao='" + req.body.nome + "', anos = '" + req.body.ano + "' , cargo='" + req.body.cargo + "', descricao='" + req.body.descricao + "' WHERE realizacao='" + req.body.realizacao + "'";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	res.write('<p>Atualizacao feita com sucesso!</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
    console.log(`Server running at localhost:${port}/`);
  });
