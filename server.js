const express = require('express');
const { InputException } = require('./lib/exceptions');

const ratesRouter = require('./routes/rates');
const conversionRouter = require('./routes/convert');
const arithmeticRouter = require('./routes/artihmetic');

const app = express();


app.use(ratesRouter);
app.use(conversionRouter);
app.use(arithmeticRouter);


app.use(function (error, _, response, next) {
    if (response.headerSent) return next(error);
    const isExpectedError = error instanceof InputException

    if (!isExpectedError) console.error(error)
    else console.warn(error.message);

    response
        .status(isExpectedError ? 400 : 500)
        .send({error: error.message});
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
