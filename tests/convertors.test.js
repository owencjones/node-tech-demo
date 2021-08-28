const {
    currencyToUSD,
    usdToCurrency,
    currencyToCurrency
} = require('../lib/convertors');

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
                expect(() => usdToCurrency(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow();
            });

            it('should throw an error if amount is not a number', () => {
                expect(() => usdToCurrency('NaN', 'ABC', exampleConversionData)).toThrow();
            });

            it('should throw an error if dataset is not an object', () => {
                expect(() => usdToCurrency(15, 'ABC', 'not an object')).toThrow();
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
                expect(() => currencyToUSD(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow();
            });

            it('should throw an error if amount is not a number', () => {
                expect(() => currencyToUSD('NaN', 'ABC', exampleConversionData)).toThrow();
            });

            it('should throw an error if dataset is not an object', () => {
                expect(() => currencyToUSD(15, 'ABC', 'not an object')).toThrow();
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
                expect(() => currencyToCurrency(15, 'NONEXISTENTCURRENCYCODE', 'ABC', exampleConversionData)).toThrow();
            });

            it('should throw an error if second currency code is not in data set', () => {
                expect(() => currencyToCurrency(15, 'ABC', 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow();
            });

            it('should throw an error if amount is not a number', () => {
                expect(() => currencyToCurrency('NaN', 'ABC', 'DEF', exampleConversionData)).toThrow();
            });

            it('should throw an error if dataset is not an object', () => {
                expect(() => currencyToCurrency(15, 'ABC', 'DEF', 'not an object')).toThrow();
            });
        });
    });
});
