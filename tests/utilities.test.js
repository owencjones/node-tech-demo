jest.unmock('../lib/utilities');
jest.unmock('../lib/exceptions');
const {
    requireValidNumber,
    requireValidCurrencyCode,
    requireValidCurrencyObject
} = require('../lib/utilities');
const { InputException } = require('../lib/exceptions');
const exampleConversionData = require('./exampleConversionData.json');

describe('Utility functions', () => {
    describe('requireValidNumber', () => {
        it('should return if passed a number', () => expect(() => requireValidNumber(15)).not.toThrow());

        it('should throw an input error if passed an invalid number', () => expect(() => requireValidNumber('Not a valid number')).toThrow(InputException));
    });

    describe('requireValidCurrencyCode', () => {
        it('should return nothing if passed a currency code', () => expect(() => requireValidCurrencyCode('ABC', exampleConversionData)).not.toThrow());

        it('should throw an input error if passed a non string', () => expect(() => requireValidCurrencyCode(1, exampleConversionData)).toThrow(InputException));

        it('should throw an input error if passed a too-short string', () => expect(() => requireValidCurrencyCode('AB', exampleConversionData)).toThrow(InputException));

        it('should throw an input error if passed a too-long string', () => expect(() => requireValidCurrencyCode('ABCD', exampleConversionData)).toThrow(InputException));

        it('should throw an input error if passed a string containing invalid characters', () => expect(() => requireValidCurrencyCode('AB1')).toThrow(InputException));
    });

    describe('requireValidCurrencyObject', () => {
        it('should return if the object is valid', () => expect(() => requireValidCurrencyObject({ABC: 1}, exampleConversionData)).not.toThrow())

        it('should require an Object', () => expect(() => requireValidCurrencyObject('ABC', exampleConversionData)).toThrow(InputException));

        it('should require an Object in which the keys are valid currencies', () => expect(() => requireValidCurrencyObject({ AB1: 1 }, exampleConversionData)).toThrow(InputException));

        it('should require an Object in which the value are valid numbers', () => expect(() => requireValidCurrencyObject({ABC: 'ab'}, exampleConversionData)).toThrow(InputException));
    })
});
