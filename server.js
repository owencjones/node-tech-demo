const express = require('express');

const ratesRouter = require('./routes/rates')

const app = express();

app.use(ratesRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
