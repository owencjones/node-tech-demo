# Equal Experts: Currency Coverter

(Reference: `5b8d0fd276b6d288905ed2f63a934e057e8feca2`)

## Introduction

Welcome, this tech demo was done to demonstrate my Node, and coding ability, for a position with Equal Experts.  Fair warning, it was done over the course of a couple of days, whilst looking after my kids, so hopefully it reaches the standards you hope for.  In total, I spent around 2 hours looking at the task.

There are parts I would expand, and I have noted these later in the README.

A few notes:

* I've aimed to use best known libraries, rather than newest.  This is just to increase likelihood that those that have to deal with the code are already familiar with it.
* I added some linting tooling with a common set of rules, this works out of the box with my editor, and helped to maintain code consistency.
* I used Jest for testing, because I've been using it recently on a project, so it's fresh in the mind.
* I aimed overall to minimise dependencies.  The codebase has 7 dependencies in total, but can be deployed with just one (Express) - the others are development tools.  Even these could be eliminated.
* Routes files haven't been tested, because I don't test implementation, just function, but overall coverage is 98%, and tests are atomic.

## Dependencies

* Node.js (was written using NVM and Node 14.5, but would likely run in older versions too)
* NPM, although Yarn could likely also install the packages

## Running the app

* Pull the code down to a local directory
* Ensure that you have the right version of Node local to that directory.  If you have NVM, there is an `.nvmrc` file that will allow you to switch easily: `nvm use`
* Start the app: `npm start`
* You can also run the unit tests using `npm test`

## The Tasks

Not every task explicitly asked for an endpoint, but it was convenient to provide one, and if asked to refactor into a CLI app or something else, that would straight forward.  Besides...

> There are two types of people in the world.  Those who can extrapolate from incomplete data

### "Implement an End Point which can return the exchange rate from Euro to Dollars"

I created an Express router in `routes/rates.js`, which provides an endpoint `/rates/eur/usd`, which returns a JSON object, detailing the to and from currencies, and the rate.

The endpoint is not generalised, but parameterising the route, and altering the function briefly could make it able to deliver the rate for any of the currencies in the data.

```JSON
{
    "from":"EUR",
    "to":"USD",
    "rate":"1.13876"
}
```

### "Extend your solution to convert US dollars to British Pounds"

This was added as another Express router in `routes/convert.js`, which provides the endpoint `/convert/usd/gbp/:amount`, and returns a JSON object detailing the conversion.

Again, this could be generalised easily, and I've deliberately avoided implementing unneccesary YAGNI code, but also deliberately have written the endpoint, and supporting code, in a way that would make a general version of this easy to implement.

```JSON
{
    "meta":{
        "from":"USD",
        "to":"GBP"
    },
    "amounts":{
        "USD":1,
        "GBP":1.27276
    }
}
```

### "Extend your solution to convert Euro to British Pounds"

I added this to the same router as the last task, and it outputs the same schema of JSON object.  It's found at `/convert/eur/gbp/:amount`.

The other aspect of this was that the schema of the URLs is designed to separate functions of the system, and make the parameters clear for different potential endpoints.

```JSON
{
    "meta":{
        "from":"EUR",
        "to":"GBP"
    },
    "amounts":{
        "EUR":1,
        "GBP":0.89471
    }
}
```

### "Extend your solution to add 13.12 Euro to 99 British Pounds and return 185.64 CAD"

For this I created a different router, as it performs a different function, and called it `routes/arithmetic.js`, and this provides the endpoint `/add`.  I considered parameterising this, but the requirements didn't call for this, so it just returns a JSON object containing details of the addition, and the result.

The only aspect of this that wasn't out of the box was the number of decimal places on the result, as elsewhere the data has dealt with 5 decimal places, and I had followed this convention.

```JSON
{
    "meta": {
        "add": "13.12EUR",
        "to": "99GBP",
        "output": "185.64CAD"
    }
}
```

## Improvements I would make

* E2E testing with something like supertest, to cover the functionality of the controllers.
* Move validation into controllers, and use something like Joi to validate the user input.
