class APIException extends Error {
    addOriginalError(error) {
        this.originalError = error;
    }
}

class InputException extends APIException {}

module.exports = {
    APIException, InputException
};
