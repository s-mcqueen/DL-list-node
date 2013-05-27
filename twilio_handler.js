var twilio = require('twilio')
  , parse = require('./sms_parse');

// twilio set up
var twilioId = "AC65492579e6a94943a72ebed4c4f4b788";
var twilioToken = "81ebc16c6a6fd61bf25631ee0b649e01";
var twilioNum = "+13602052266";
var client = new twilio.RestClient(twilioId, twilioToken);

// incoming texts

function getFromAndBody(req){
    var sid = req.body.SmsMessageSid;
    client.sms.messages(sid).get(function(err, message) {
        var from = message.from;
        var body = message.body;
    });
    return [from, body];
}

function sendMessage(toNum, body){
    client.sms.messages.create({
        to: toNum,
        from: twilioNum,
        body: body
    }, function(err, message){
        if (err){
            console.log("twilio sending error");
        }
    });
}

// incoming text messages
var body_badText = "SMS FORMAT ERROR. Make sure your text looks like this: \
                'name of group to text: body of your announcement'";
var body_badListName = "GROUP NAME ERROR. There doesn't seem to be a group with that name";                      
var body_badPrivileges = "AUTHORIZATION ERROR. It looks like this phone number is not \
                        authorized to send a message to that group.";
var body_other = "Unfortunately this announcement system is one-way. You can reach \
                        an ASCMC officer by their school email. Thanks!";

// incoming text handlers

function handleBadText(number){
    sendMessage(number, body_badText);
}

function handleBadListName(number){
    sendMessage(number, body_badListName);
}

function handleBadPrivileges(number){
    sendMessage(number, body_badPrivileges);
}

function handleOther(number){
    sendMessage(number, body_other);
}


// process authorized

// process unauthorized



exports.getFromAndBody = getFromAndBody;
exports.sendMessage = sendMessage;
exports.handleBadText = handleBadText;
exports.handleBadListName = handleBadListName;
exports.handleBadPrivileges = handleBadPrivileges;
exports.handleOther = handleOther;


