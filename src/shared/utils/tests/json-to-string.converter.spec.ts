import { convertJsonToString } from '../json-to-string.converter';

describe('convertJsonToString', () => {
  it('should convert a valid JSON object to a string with custom separators', () => {
    const json = {
      ProductID: [
        {
          ProductID1: '4',
          ProductID2: '8',
          ProductID3: '15',
          ProductID4: '16',
          ProductID5: '23',
        },
        {
          ProductID1: 'a',
        },
      ],
    };

    const elementSeparator = '*';
    const lineSeparator = '~';

    const expectedOutput = 'ProductID*4*8*15*16*23~ProductID*a~';

    const result = convertJsonToString(json, elementSeparator, lineSeparator);

    expect(result).toBe(expectedOutput);
  });

  it('should throw an error if the input is null', () => {
    expect(() => convertJsonToString(null, '*', '~')).toThrow(
      'Invalid input: json must be a non-null object.',
    );
  });

  it('should throw an error if a segment is not an array', () => {
    const invalidJson = {
      ProductID: 'Not an array',
    };

    expect(() => convertJsonToString(invalidJson as any, '*', '~')).toThrow(
      'Invalid input: ProductID is not an array.',
    );
  });

  it('should handle multiple keys and multiple elements', () => {
    const json = {
      ProductID: [
        { ProductID1: '1', ProductID2: '2' },
        { ProductID1: '3', ProductID2: '4' },
      ],
      OrderID: [
        { OrderID1: '5', OrderID2: '6' },
        { OrderID1: '7', OrderID2: '8' },
      ],
    };

    const elementSeparator = '*';
    const lineSeparator = '~';

    const expectedOutput =
      'ProductID*1*2~ProductID*3*4~OrderID*5*6~OrderID*7*8~';

    const result = convertJsonToString(json, elementSeparator, lineSeparator);

    expect(result).toBe(expectedOutput);
  });

  it('should return an empty string if the JSON object is empty', () => {
    const json = {};

    const result = convertJsonToString(json, '*', '~');

    expect(result).toBe('');
  });
});
