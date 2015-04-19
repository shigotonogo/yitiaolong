var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var hbs  = require('express-hbs');
var app = express();

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


app.use(favicon());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

require('./auth.js')(app);
app.use('/', require('./routes/facehub.js'));

process.on('uncaughtException', function(err) {
    console.error('Caught exception: ', err);
});

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('please visit http://127.0.0.1:' + server.address().port);
});
