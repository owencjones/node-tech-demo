const { InputException } = require('./exceptions');

const requireValidNumber = number => {
    if (typeof number !== 'number' || isNaN(number)) throw new InputException('Expected a number');
}

const requireValidCurrencyCode = (code, data) => {
    const isNotString = typeof code !== 'string';
    const isNotThreeLettersLong = String(code).length !== 3;
    const containsInvalidCharacters = !!String(code).match(/[^A-Z]/i)
    if (
        isNotString ||
        isNotThreeLettersLong ||
        containsInvalidCharacters
    ) throw new InputException('Expected 3-letter string');

    if (!Object.keys(data).includes(code)) throw new InputException(`Currency code ${code} doesn't exist`);
};
const requireValidCurrencyObject = currencyObject => {
    if (typeof currencyObject !== 'object') throw new InputException('Expected object');

    Object.entries(currencyObject).map(
        ([key, value]) => {
            requireValidCurrencyCode(key, currencyObject);
            requireValidNumber(value);
        }
    );
};

module.exports = {
    requireValidNumber, requireValidCurrencyCode, requireValidCurrencyObject
};
