
jest.unmock('../lib/exceptions');
jest.unmock('../lib/convertors');

const { InputException } = require('../lib/exceptions');
const exampleConversionData = require('./exampleConversionData.json');

describe('Convertor tests', () => {

    beforeAll(() => {
    });

    afterEach(() => jest.resetAllMocks());
    afterAll(() => jest.restoreAllMocks());

    describe('Conversion functions', () => {
        describe('usdToCurrency', () => {
            describe('Happy path scenarios', () => {
                it('should correctly convert an amount of USD to a currency', () => {
                    const { usdToCurrency } = require('../lib/convertors');

                    expect(usdToCurrency(15, 'ABC', exampleConversionData)).toBe(7.5)
                });
            });

            describe('Sad path scenarios', () => {
                it('should throw an error if currency code is not validated', () => {
                    const { usdToCurrency } = require('../lib/convertors');
                    const { requireValidCurrencyCode } = require('../lib/utilities');

                    requireValidCurrencyCode.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => usdToCurrency(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow(InputException);
                });

                it('should throw an error if amount is validated', () => {
                    const { usdToCurrency } = require('../lib/convertors');
                    const { requireValidNumber } = require('../lib/utilities');

                    requireValidNumber.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => usdToCurrency('NaN', 'ABC', exampleConversionData)).toThrow(InputException);
                });

                it('should throw an error if dataset is validated', () => {
                    const { usdToCurrency } = require('../lib/convertors');
                    const { requireValidCurrencyObject } = require('../lib/utilities');

                    requireValidCurrencyObject.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => usdToCurrency(15, 'ABC', 'not an object')).toThrow(InputException);
                });
            });
        });

        describe('currencyToUSD', () => {
            describe('Happy path scenarios', () => {
                it('should correctly convert an amount of currency to USD', () => {
                    const { currencyToUSD } = require('../lib/convertors');

                    expect(currencyToUSD(15, 'ABC', exampleConversionData)).toBe(30)
                })
            });

            describe('Sad path scenarios', () => {
                it('should throw an error if currency code is not validated', () => {
                    const { currencyToUSD } = require('../lib/convertors');
                    const { requireValidCurrencyCode } = require('../lib/utilities');

                    requireValidCurrencyCode.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => currencyToUSD(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow(InputException);
                });

                it('should throw an error if amount is validated', () => {
                    const { currencyToUSD } = require('../lib/convertors');
                    const { requireValidNumber } = require('../lib/utilities');

                    requireValidNumber.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => currencyToUSD('NaN', 'ABC', exampleConversionData)).toThrow(InputException);
                });

                it('should throw an error if dataset is validated', () => {
                    const { currencyToUSD } = require('../lib/convertors');
                    const { requireValidCurrencyObject } = require('../lib/utilities');

                    requireValidCurrencyObject.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => currencyToUSD(15, 'ABC', 'not an object')).toThrow(InputException);
                });
            });
        });

        describe('currencyToCurrency', () => {
            describe('Happy path scenarios', () => {
                it('should correctly convert an ABC to DEF', () => {
                    const { currencyToCurrency } = require('../lib/convertors');

                    expect(currencyToCurrency(15, 'ABC', 'DEF', exampleConversionData)).toBe(22.5)
                });

                it('should correctly convert an DEF to GHI', () => {
                    const { currencyToCurrency } = require('../lib/convertors');

                    expect(currencyToCurrency(15, 'DEF', 'GHI', exampleConversionData)).toBe(16)
                })
            });

            describe('Sad path scenarios', () => {
                it('should throw an error if currency code is not validated', () => {
                    const { currencyToCurrency } = require('../lib/convertors');
                    const { requireValidCurrencyCode } = require('../lib/utilities');

                    requireValidCurrencyCode.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => currencyToCurrency(15, 'NONEXISTENTCURRENCYCODE', exampleConversionData)).toThrow(InputException);
                });

                it('should throw an error if amount is validated', () => {
                    const { currencyToCurrency } = require('../lib/convertors');
                    const { requireValidNumber } = require('../lib/utilities');

                    requireValidNumber.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => currencyToCurrency('NaN', 'ABC', exampleConversionData)).toThrow(InputException);
                });

                it('should throw an error if dataset is validated', () => {
                    const { currencyToCurrency } = require('../lib/convertors');
                    const { requireValidCurrencyObject } = require('../lib/utilities');

                    requireValidCurrencyObject.mockImplementation(() => {
                        throw new InputException();
                    });

                    expect(() => currencyToCurrency(15, 'ABC', 'not an object')).toThrow(InputException);
                });
            });
        });

        describe('reverseCurrencyFromToRates', () => {
            it ('should return a valid reversed from and to rate when passed valid input', () => {
                const { reverseCurrencyFromToRates } = require('../lib/convertors');

                expect(reverseCurrencyFromToRates(2)).toBe(0.5)
            });

            it('should throw error if not passed a number', () => {
                const { reverseCurrencyFromToRates } = require('../lib/convertors');
                const { requireValidNumber } = require('../lib/utilities');

                requireValidNumber.mockImplementation(() => {
                    throw new InputException();
                })

                expect(() => reverseCurrencyFromToRates('not a number')).toThrow();
            })
        })
    });
});
