
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    twiliohandler = require('./twilio_handler');

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

    console.log(req.body.SmsMessageSid);

    twiliohandler.getFromAndBody(req, function(value){
        var from = value[0];
        var body = value[1];
        console.log(from);
        console.log(body);
        // test for authorization
            // pass handling opperations off
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
