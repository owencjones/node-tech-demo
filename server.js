const express = require('express');

const ratesRouter = require('./routes/rates')
const conversionRouter = require('./routes/convert');

const app = express();

app.use(ratesRouter);
app.use(conversionRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
