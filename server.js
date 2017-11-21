// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'sampak.clhgy6smxmsq.us-east-1.rds.amazonaws.com',
  user     : 'spak7128',
  password : 'Thought9sam',
  database : 'DrinkerBeerBar'
});

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.put('/api/putUser',function(req,res){
  res.contentType('application/json');
  
  //var entry = [req.body.name, req.body.city, req.body.phone, req.body.age, req.body.happy, req.body.music, req.body.personality];

   var drinker = {
        Name: req.body.name,
        City: req.body.city,
        PhoneNum: req.body.phoneNum,
        Age: req.body.age,
        PrefTime: req.body.prefTime,
        Music: req.body.music,
        Personality: req.body.personality

    };

  var sql = "INSERT INTO Drinkers SET ?";
  connection.connect()

  var query = connection.query(sql, drinker, function (err, rows, fields) {
    if (err) throw err
  })

  connection.end()
  res.send(req.body);
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));