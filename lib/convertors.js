const { InputException } = require('./exceptions');

const requireValidNumber = number => {
    if (typeof number !== 'number' || isNaN(number)) throw new InputException('Expected a number');
}

const requireValidCurrencyCode = code => {
    const isNotString = typeof code !== 'string';
    const isNotThreeLettersLong = String(code).length !== 3;
    const containsInvalidCharacters = !!String(code).match(/[^A-Z]/i)
    if (
        isNotString ||
        isNotThreeLettersLong ||
        containsInvalidCharacters
    ) throw new InputException('Expected 3-letter string') };
const requireValidCurrencyObject = currencyObject => {
    if (typeof currencyObject !== 'object') throw new InputException('Expected object');

    Object.entries(currencyObject).map(
        ([key, value]) => {
            requireValidCurrencyCode(key);
            requireValidNumber(value);
        }
    );
};


const currencyToUSD = (amount, currencyCode, data) => {
    //TODO
};

const usdToCurrency = (amount, currencyCode, data) => {
    // TODO
};

const currencyToCurrency = (amount, currencyCodeFrom, currencyCodeTo, data) => {
    // TODO
};

module.exports = {
    currencyToUSD,
    currencyToCurrency,
    usdToCurrency,

    requireValidNumber,
    requireValidCurrencyCode,
    requireValidCurrencyObject
}
