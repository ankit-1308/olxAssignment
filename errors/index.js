const errorMessages = require("./errorMessages");
const errorCodes = require("./errorCodes");

function getError(errorCode) {
    return errorMessages[errorCode] || errorMessages[errorCodes.UNKNOWN_ERROR];
}

module.exports = getError;