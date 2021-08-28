const { Router } = require('express');
const ratesData = require('../data/rates.json');
const { usdToCurrency, currencyToCurrency } = require('../lib/convertors')

const conversions = Router();
conversions.get('/convert/usd/gbp/:usd', (req, res) => {
    const USD = Number(req.params.usd);
    const GBP = usdToCurrency(USD, 'GBP', ratesData).toFixed(5);

    res.json({
        meta: {
            'from': 'USD',
            'to': 'GBP'
        },
        amounts: {
            USD,
            GBP
        }
    })
});

conversions.get('/convert/eur/gbp/:eur', (req, res) => {
    const EUR = Number(req.params.eur);
    const GBP = currencyToCurrency(EUR, 'EUR', 'GBP', ratesData).toFixed(5);

    res.json({
        meta: {
            'from': 'EUR',
            'to': 'GBP'
        },
        amounts: {
            EUR,
            GBP
        }
    })
});

module.exports = conversions;
