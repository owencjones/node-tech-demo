const { Router } = require('express');
const ratesData = require('../data/rates.json');
const { usdToCurrency } = require('../lib/convertors')

const conversions = Router();
conversions.get('/convert/usd/gbp/:usd', (req, res) => {
    const USD = Number(req.params.usd);
    const GBP = usdToCurrency(USD, 'GBP', ratesData);

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

module.exports = conversions;
