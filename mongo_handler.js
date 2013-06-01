var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// connection
var dbName = 'mcqueen-blog';
var dbUser = 'smcqueen';
var dbPass = 'Castle1q'; // annoying to make this plaintext..
var dbHostAddr = 'ds027628.mongolab.com:27628/mcqueen-blog';

mongoose.connect('mongodb://' + dbUser + ':' + dbPass + '@' + dbHostAddr);

var db = mongoose.connection;

// schemas
var AuthorizedUserSchema = new Schema({
    userName: String,
    phoneNumber: String,
    listPrivileges: [DList]
});

var UserSchema = new Schema({
    userName: String,
    phoneNumber: String,
    email: String,
    listMembership: [DList]   // holds an array of DLists
});

var DListSchema = new Schema({
    listName: String,
    phoneNumbers: Array
});

var MessageSchema = new Schema({
    createdAt: Date,
    body: String,
    toList: [DList],
    fromUser: [User]
});

// models
var AuthorizedUser = mongoose.model('AuthorizedUser', AuthorizedUserSchema);
var User = mongoose.model('User', UserSchema);
var DList = mongoose.model('DList', DListSchema);
var Message = mongoose.model('Message', MessageSchema);

// authorized user functions
function newAuthUser(userName, phoneNumber, listPrivileges){
    var user = AuthorizedUser();
    user.userName = userName;
    user.phoneNumber = phoneNumber;
    user.listPrivileges = listPrivileges;
    user.save(function (err){
        if (err){
            console.log('auth user save error');
        }
    });
    return user;
}

// callback is only called if user is authorized
// use this function with appropriate callback to access authuser fields
function getAuthorized(number, callback){
    var query = AuthorizedUser.findOne({ 'phoneNumber': number });
    query.exec(function (err, user) {
        if(user !== null){
            callback(user);
        }
    });
}

// user functions
function newUser(userName, phoneNumber, email, listMembership){
    var user = User();
    user.userName = userName;
    user.phoneNumber = phoneNumber;
    user.email = email;
    user.listMembership = listMembership;
    user.save(function (err){
        if (err){
            console.log('user save error');
        }
    });
    return user;
}

// callback is only called if user exists
function getUser(number, callback){
    var query = User.findOne({'phoneNumber': number});
    query.exec(function (err, user) {
        if(user !== null){
            callback(user);
        }
    });
}

// list functions
function newList(listName, phoneNumbers){
    var list = DList();
    list.listName = listName;
    list.phoneNumbers = phoneNumbers;
    list.save(function (err){
        if (err){
            console.log('list save error');
        }
    });
    return list;
}   

// callback is only called if list exists
function getList(listName, callback){
    var query = DList.findOne({ 'listName' : listName });
    query.exec(function (err, list){
        if (list !== null){
            callback(list);
        }
    });
}

// TODO:
// Need to figure out a way to update a list AND the list representation in
// cooresponding authorized user... maybe need to change db schema to store name as string
function addToList(listName, newNumber){
    getList(listName, function(list){
        console.log('in callback');
        list.phoneNumbers.push(newNumber);
        list.save();
    });
}

// message functions
function newMessage(messageBody, listName, fromUser){
    var message = Message();
    message.body = messageBody;
    message.toList = listName;
    message.fromUser = fromUser;
    message.save(function(err){
        if (err){
            console.log("message save error");
        }
    });
    return message;
}

db.once('open', function callback(){
    console.log('connection open');

    // db event loop

});
