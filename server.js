const express = require('express');

const ratesRouter = require('./routes/rates');
const conversionRouter = require('./routes/convert');
const arithmeticRouter = require('./routes/artihmetic');


const app = express();

app.use(ratesRouter);
app.use(conversionRouter);
app.use(arithmeticRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
