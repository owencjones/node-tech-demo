const { Router } = require('express');

const euroToDollarRouter = Router();
euroToDollarRouter.get('/eur/usd', (req, res) => {
    //TODO
    res.send('OK')
});

module.exports = euroToDollarRouter;