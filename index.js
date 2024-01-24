const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const helmet = require('helmet');


const app = express();
app.use(cors(), express.json());
app.use(helmet());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'botarga'
});


db.connect((err => {
    if (err) throw err;
    console.log('Database conectada');
}));


app.get('/', (req, res) => {
    res.send('Hello World');
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));



app.post('/user', (req, res) => {
    let sql = 'INSERT INTO usuario SET ? ';
    let query = db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        console.log('status: 200');
        res.send('Usuario creado');
    });
});


app.get('/usuarios', (req, res) => {
    let sql = 'SELECT * FROM usuario';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        console.log('status: 200');
        res.send(results);
    })
});