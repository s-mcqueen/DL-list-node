var mongoose = require('mongoose');

var dbName = 'mcqueen-blog';
var dbUser = 'smcqueen';
var dbPass = 'Castle1q'; // annoying to make this plaintext..
var dbHostAddr = 'ds027628.mongolab.com:27628/mcqueen-blog';

mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + 'dbHostAddr');

var db = mongoose.connection;


// schemas

// AuthorizedUser
    // username, phonenumber, listprivildges

// User
    // username, phone, email, list membership

// DList 
    // listname, phonenumberlist

// Message
    // message, tolist, fromuser, createdat