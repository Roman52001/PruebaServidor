const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql= require('mysql')

const routes = require('./routes');
const routesApi = require('./routes-api');
 
 var bodyParser = require('body-parser');

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

//dbconnection
// connection configurations
 var db = mysql.createConnection({
     host: '34.70.226.179',
     port: '3306',
     user: 'root',
     password: 'practicante',
     database: 'dbproyecto'
 });
 // connect to database
 db.connect(); 


//middlewares

app.set('appName', 'Mi Primer Server');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
 
app.use(morgan('dev'));

//rutas
app.use(routes);
app.use('/api', routesApi);

//get all the users from database
 app.get('/getEmpleados', function (req, res) {
     db.query('SELECT * FROM empleado', function (error, results, fields) {
         if (error) throw error;
         return res.json(results); 
     });
 });

app.get('*', (req, res) => {
    res.end('Archivo No Encontrado');
   });


app.get('/ejemplo', function(req, res) {
  var n1 = req.param('n1');
  var n2 = req.param('n2');
  var total = req.param('total');  

  res.send(n1 + ' ' + n2 + ' ' + total);
});


app.set('port', process.env.PORT || 3002);
app.listen(app.get('port'),()=>{
    console.log(`Servidor corriendo en puerto:'${app.get('port')}'`);
    console.log('Nombre de la App:', app.get('appName'));
});

