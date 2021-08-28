const express = require('express');

const euroToDollarRouter = require('./routes/euroToDollars')

const app = express();

app.use(euroToDollarRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});