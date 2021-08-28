class APIException extends Error {}

class InputException extends APIException {}

module.exports = {
    APIException, InputException
};
