const { Router } = require('express');
const ratesData = require('../data/rates.json');
const { reverseCurrencyFromToRates } = require('../lib/convertors')

const rates = Router();
rates.get('/rates/eur/usd', (req, res) => {
    const eurUsdRate = reverseCurrencyFromToRates(ratesData.EUR);

    res.json({
        from: 'EUR',
        to: 'USD',
        rate: eurUsdRate.toFixed(5)
    })
});

module.exports = rates;
