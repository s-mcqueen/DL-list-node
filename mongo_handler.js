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
    message: String,
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


db.once('open', function callback(){
    console.log('connection open');

    // var ta1 = newAuthUser('skunselman', '+12', []);

    addToList('senate', '+66666');


    // TESTING!


    // getAuthorized('+12', function (user){
    //     console.log(user.userName);
    // });

    // var testList1 = new DList({listName: 'senate', phoneNumbers: ['+12067187746', '+12063250402'] });
    // testList1.save(function (err) {
    //     if (err){
    //         console.log('testList1 save error');
    //     }
    // });

    // var testList2 = new DList({listName: 'ascmc', phoneNumbers: ['+12345678901', '+12063250402'] });

    // testList2.save(function (err) {
    //     if (err){
    //         console.log('testList2 save error');
    //     }
    // });

    // var testUser = new User();
    // testUser.userName = 'sean';
    // testUser.phoneNumber = '+12067187746';
    // testUser.email = 'sean@mcqueen.net';
    // testUser.listMembership = [testList1, testList2];

    // testUser.save(function (err) {
    //     if (err){
    //         console.log('testUser save error');
    //     }
    // });

});
