const { Router } = require('express');
const ratesData = require('../data/rates.json');
const { reverseCurrencyFromToRates } = require('../lib/convertors')

const euroToDollarRouter = Router();
euroToDollarRouter.get('/rates/eur/usd', (req, res) => {
    const eurUsdRate = reverseCurrencyFromToRates(ratesData.EUR);

    res.json({
        EURUSD: eurUsdRate
    })
});

module.exports = euroToDollarRouter;
