/**
 * Module dependencies.
 */

var express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var methodOverride = require('method-override');
var models = require('./server/models/index');
var morgan = require('morgan');
var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev')); // log every request to the console
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));

models.sequelize.sync().then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
var apiRoutes = require('./server/routesApi/index');

app.get('/', function (req, res) {
    res.sendfile('client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
app.use('/api', apiRoutes);
