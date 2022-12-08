const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const hostname = '127.0.0.1';
const port = 3001;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'curriculo.db';
const path = require('path');

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
    var sql = 'SELECT nome_da_realizacao, anos, descricao FROM realizacoes WHERE id=1';
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
    // res.sendFile("C:/Users/Inteli/Documents/GitHub/Tutorial_M2/SEMANA_07/03_AUT_EST_ENTREGA/Currículo/front/index.html");
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
