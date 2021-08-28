const { Router } = require('express');
const ratesData = require('../data/rates.json');
const { currencyToUSD, usdToCurrency } = require('../lib/convertors')

const arithmetic = Router();
arithmetic.get('/add', (req, res) => {
    const eur = 13.12;
    const gbp = 99;
    const usdTotal = currencyToUSD(eur, 'EUR', ratesData) + currencyToUSD(gbp, 'GBP', ratesData);

    const output = usdToCurrency(usdTotal, 'CAD', ratesData).toFixed(2);

    res.json({
        meta: {
            'add': '13.12EUR',
            'to': '99GBP',
            'output': output + 'CAD'
        }
    })
});

module.exports = arithmetic;
