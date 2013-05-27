function colonSplit(smsText){
    return smsText.split(":");
}

function validText(smsText){
    var sms = colonSplit(smsText);
    if (sms.length < 2){
        return false;
    }

    // get first elm, make lower and remove spaces
    listName = sms[0].toLowerCase().replace(/\s+/g, '');
    
    // return true if contains only alphanumeric chars
    var re = /^[a-z0-9]+$/i;
    return re.test(listName);
}

function getListName(smsText){
    var sms = colonSplit(smsText);
    if (validText(smsText)){
        return sms[0].toLowerCase().replace(/\s+/g, '');
    }
    else throw new Error("sms is not valid."); 
    // TODO: catch this error!!
}

function getMessageBody(smsText){
    var sms = colonSplit(smsText);
    if (validText(smsText)){
        return sms[1];
    }
    else throw new Error("sms is not valid."); 
    // TODO: catch this error!!
}

exports.validText = validText;
exports.getListName = getListName;
exports.getMessageBody = getMessageBody;


// // testing
// var badteststr = "8:f8f(((f8f88&&";
// var teststr = "senate: hey everyone, senate cancelled";

// var sp = validText(teststr);
// console.log(sp);

// var ln = getListName(teststr);
// console.log(ln);

// var mb = getMessageBody(teststr);
// console.log(mb);
