const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12660513',
    password: '2DHW3ryuqm',
    database: 'sql12660513'
})

app.post('/signup', (req,res) => {
    const query = 'INSERT INTO login (`name`,`email`,`password`) VALUES(?)';
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(query, [values], (err,data) => {
        if(err)
            return res.json("Could not register. Sign up again")
        res.json("Registered successfully!");
    })
})

app.post('/login', (req,res) => {
    const query = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(query, [req.body.email,req.body.password], (err,data) => {
        if(err)
            return res.json("Error")
        if(data.length > 0)
            return res.json("Successful");
        else    
            return res.json("Failed");
    })
})

app.post('/info', (req,res) => {
    const query = "SELECT * FROM reviews WHERE `bid` = ?";
    console.log(req.body.id)
    db.query(query,[req.body.id], (err,data) => {
        if(err)
            return res.json("Error");
        // console.log(data);
        return res.send(data);
    })
})

app.post('/addinfo', (req,res) => {
    const query = "INSERT INTO reviews (`id`,`user`,`rating`,`comment`,`bid`) VALUES(?)";
    console.log(req.body)
    db.query(query,[Math.floor(Math.random()*10),req.body.user,req.body.rating,req.body.comment,req.body.id], (err,data) => {
        if(err)
            return res.json("Error");
        return res.json("Ok");
    })
})


app.listen(8081, () => {
    console.log("Listening");
}) 