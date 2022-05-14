module.exports = function phoneNumber(inputtxt) {
    var phoneno = /^\d{11}$/;
    if (inputtxt.match(phoneno)){
        return true;
    }
    else {
        return false;
    }
}