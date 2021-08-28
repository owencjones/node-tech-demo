const {
    currencyToUSD,
    usdToCurrency,
    currencyToCurrency,

    requireValidNumber,
    requireValidCurrencyCode,
    requireValidCurrencyObject
} = require('../lib/convertors');
const { InputException } = require('../lib/exceptions');

describe('Convertor tests', () => {

    const exampleConversionData = {
        ABC: 0.5,
        DEF: 0.75,
        GHI: 0.8
    };

    describe('usdToCurrency', () => {
        describe('Happy path scenarios', () => {
            it('should correctly convert an amount of USD to a currency', () => {
                expect(usdToCurrency(15, 'ABC', exampleConversionData)).toBe(7.5)
            })
        });

        describe('Sad path scenarios', () => {
            it('should throw an error if currency code is not in data set', () => {
                expect(() => usdToCurrency(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if amount is not a number', () => {
                expect(() => usdToCurrency('NaN', 'ABC', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if dataset is not an object', () => {
                expect(() => usdToCurrency(15, 'ABC', 'not an object')).toThrow(InputException);
            });
        });
    });

    describe('currencyToUSD', () => {
        describe('Happy path scenarios', () => {
            it('should correctly convert an amount of currency to USD', () => {
                expect(currencyToUSD(15, 'ABC', exampleConversionData)).toBe(30)
            })
        });

        describe('Sad path scenarios', () => {
            it('should throw an error if currency code is not in data set', () => {
                expect(() => currencyToUSD(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if amount is not a number', () => {
                expect(() => currencyToUSD('NaN', 'ABC', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if dataset is not an object', () => {
                expect(() => currencyToUSD(15, 'ABC', 'not an object')).toThrow(InputException);
            });
        });
    });

    describe('currencyToCurrency', () => {
        describe('Happy path scenarios', () => {
            it('should correctly convert an ABC to DEF', () => {
                expect(currencyToCurrency(15, 'ABC', exampleConversionData)).toBe(30)
            });

            it('should correctly convert an DEF to GHI', () => {
                expect(currencyToCurrency(15, 'ABC', exampleConversionData)).toBe(30)
            })
        });

        describe('Sad path scenarios', () => {
            it('should throw an error if first currency code is not in data set', () => {
                expect(() => currencyToCurrency(15, 'NONEXISTENTCURRENCYCODE', 'ABC', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if second currency code is not in data set', () => {
                expect(() => currencyToCurrency(15, 'ABC', 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if amount is not a number', () => {
                expect(() => currencyToCurrency('NaN', 'ABC', 'DEF', exampleConversionData)).toThrow(InputException);
            });

            it('should throw an error if dataset is not an object', () => {
                expect(() => currencyToCurrency(15, 'ABC', 'DEF', 'not an object')).toThrow(InputException);
            });
        });
    });

    describe.only('Utility functions', () => {
        describe('requireValidNumber', () => {
            it('should return if passed a number', () => expect(() => requireValidNumber(15)).not.toThrow());

            it('should throw an input error if passed an invalid number', () => expect(() => requireValidNumber('Not a valid number')).toThrow(InputException));
        });

        describe('requireValidCurrencyCode', () => {
            it('should return nothing if passed a currency code', () => expect(() => requireValidCurrencyCode('ABC')).not.toThrow());

            it('should throw an input error if passed a non string', () => expect(() => requireValidCurrencyCode(1)).toThrow(InputException));

            it('should throw an input error if passed a too-short string', () => expect(() => requireValidCurrencyCode('AB')).toThrow(InputException));

            it('should throw an input error if passed a too-long string', () => expect(() => requireValidCurrencyCode('ABCD')).toThrow(InputException));

            it('should throw an input error if passed a string containing invalid characters', () => expect(() => requireValidCurrencyCode('AB1')).toThrow(InputException));
        });

        describe('requireValidCurrencyObject', () => {
            it('should return if the object is valid', () => expect(() => requireValidCurrencyObject({ABC: 1})).not.toThrow())

            it('should require an Object', () => expect(() => requireValidCurrencyObject('ABC')).toThrow(InputException));

            it('should require an Object in which the keys are valid currencies', () => expect(() => requireValidCurrencyObject({ AB1: 1 })).toThrow(InputException));

            it('should require an Object in which the value are valid numbers', () => expect(() => requireValidCurrencyObject({ABC: 'ab'})).toThrow(InputException));
        })
    })
});
