const { Router } = require('express');
const ratesData = require('../data/rates.json');
const { reverseCurrencyFromToRates } = require('../lib/convertors')

const rates = Router();
rates.get('/rates/eur/usd', (req, res) => {
    const eurUsdRate = reverseCurrencyFromToRates(ratesData.EUR);

    res.json({
        EURUSD: eurUsdRate.toFixed(2)
    })
});

module.exports = rates;
