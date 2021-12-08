const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample'
});

connection.connect(function(error) {
    if (!!error) console.log(error);
    else console.log('Database Connected!');
});

//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Restaurant function
app.get('/', (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM restaurant";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('user_index', {
            title: 'Create , Update , Delete , Retrieve of the Restaurant table of the Campus_Eats',
            users: rows
        });
    });
});

// This function is used to add into the restaurant 
app.get('/add', (req, res) => {
    res.render('user_add', {
        title: 'Create , Update , Delete , Retrieve of the Restaurant table of the Campus_Eats'
    });
});
// Insert function is used to restaurant
app.post('/save', (req, res) => {
    let data = { location: req.body.location, restaurant_name: req.body.name, schedule: req.body.schedule, website: req.body.website };
    let sql = "INSERT INTO restaurant SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});
// SELECTING EVERYTHING FROM THE RESTAURANT TABLE  
app.get('/edit/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from restaurant where restaurant_id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user_edit', {
            title: 'Create , Update , Delete , Retrieve of the Restaurant table of the Campus_Eats',
            user: result[0]
        });
    });
});

// Update function
app.post('/update', (req, res) => {
    const userId = req.body.id;
    let sql = "update restaurant SET location='" + req.body.location + "',  restaurant_name='" + req.body.name + "',  schedule='" + req.body.schedule + "', website='" + req.body.website + "' where restaurant_id=" + req.body.id;

    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Delete function
app.get('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from restaurant where restaurant_id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});


// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});