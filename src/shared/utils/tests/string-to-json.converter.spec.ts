import { convertStringToJson } from '../string-to-json.converter';

describe('convertStringToJson', () => {
  it('should convert a valid string to JSON with custom separators', () => {
    const input = 'ProductID*4*8*15*16*23~';
    const elementSeparator = '*';
    const lineSeparator = '~';

    const expectedOutput = {
      ProductID: [
        {
          ProductID1: '4',
          ProductID2: '8',
          ProductID3: '15',
          ProductID4: '16',
          ProductID5: '23',
        },
      ],
    };

    const result = convertStringToJson(input, elementSeparator, lineSeparator);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle multiple segments in the input string', () => {
    const input = 'ProductID*4*8~OrderID*15*16~';
    const elementSeparator = '*';
    const lineSeparator = '~';

    const expectedOutput = {
      ProductID: [
        {
          ProductID1: '4',
          ProductID2: '8',
        },
      ],
      OrderID: [
        {
          OrderID1: '15',
          OrderID2: '16',
        },
      ],
    };

    const result = convertStringToJson(input, elementSeparator, lineSeparator);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty input string and return an empty object', () => {
    const input = '';
    const elementSeparator = '*';
    const lineSeparator = '~';

    const expectedOutput = {};

    const result = convertStringToJson(input, elementSeparator, lineSeparator);

    expect(result).toEqual(expectedOutput);
  });
});
