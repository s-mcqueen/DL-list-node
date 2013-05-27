
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , twilio = require('twilio')
  , parse = require('./sms_parse'); // sms parsing

// twilio set up
var twilioId = "AC65492579e6a94943a72ebed4c4f4b788";
var twilioToken = "81ebc16c6a6fd61bf25631ee0b649e01";
var twilioNum = "+13602052266";
var client = new twilio.RestClient(twilioId, twilioToken);

// var mess = client.sms.messages.list(function(err, data){
//     data.sms_messages.forEach(function(m){
//         console.log(m.status);
//     })
// });

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

app.get('/', routes.index);

app.get('/recieve', function(req, res){
    console.log(req);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
