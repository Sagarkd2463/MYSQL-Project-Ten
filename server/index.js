const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r$$100200',
    database: 'registration'
});

db.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("DB Connected Successfully...");
    }
});

app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    db.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, password],
        (err, result) => {
            if (err) {
                res.send({ status: "failed", message: err.message });
            } else {
                res.send({ status: "success", message: result });
            }
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password],
        (err, result) => {
            if (err) {
                req.setEncoding({err: err});
            } else {
                if(result.length > 0){
                    res.send({status: "success", message: result});
                } else {
                    res.send({status:"failed", message: "Entered wrong credentials!"});
                }
            }
        }
    );
});

const PORT = 3001; 

app.listen(PORT, () => {
    console.log(`Running server on http://localhost:${PORT}`);
});