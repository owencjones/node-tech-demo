const {
    requireValidNumber,
    requireValidCurrencyCode,
    requireValidCurrencyObject
} = require('./utilities');

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
    reverseCurrencyFromToRates
}
