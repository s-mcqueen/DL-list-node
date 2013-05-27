
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , twiliohandler = require('./twilio_handler');

// express set up
var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
    
app.get('/', routes.index);

app.post('/recieve', function(req, res){
    var fromAndBody = twiliohandler.getFromAndBody(req);
    var from = fromAndBody[0];
    var body = fromAndBody[1];

    console.log(body);
    // test for authorization
        // pass handling opperations off
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
