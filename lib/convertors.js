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


const currencyToUSD = (amount, currencyCode, data) => {
    requireValidNumber(amount);
    requireValidCurrencyCode(currencyCode, data);
    requireValidCurrencyObject(data);

    const exchangeRate = data[currencyCode];

    return amount / exchangeRate;
};

const usdToCurrency = (amount, currencyCode, data) => {
    requireValidNumber(amount);
    requireValidCurrencyCode(currencyCode, data);
    requireValidCurrencyObject(data);

    const exchangeRate = data[currencyCode];

    return amount * exchangeRate;
};

const currencyToCurrency = (amount, currencyCodeFrom, currencyCodeTo, data) => {
    requireValidNumber(amount);
    requireValidCurrencyCode(currencyCodeFrom, data);
    requireValidCurrencyCode(currencyCodeTo, data);
    requireValidCurrencyObject(data);
    const currencyFromInUsd = currencyToUSD(amount, currencyCodeFrom, data);
    return usdToCurrency(currencyFromInUsd, currencyCodeTo, data);
};

const reverseCurrencyFromToRates = number => {
    requireValidNumber(number);

    return 1 / number;
};

module.exports = {
    currencyToUSD,
    currencyToCurrency,
    usdToCurrency,

    requireValidNumber,
    requireValidCurrencyCode,
    requireValidCurrencyObject,

    reverseCurrencyFromToRates
}
