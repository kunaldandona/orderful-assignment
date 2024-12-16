import { JsonToJsonInputConverter } from '@modules/converters/input/json-to-json-input.converter';
import { StringToJsonInputConverter } from '@modules/converters/input/string-to-json-input.converter';
import { XmlToJsonInputConverter } from '@modules/converters/input/xml-to-json-input.converter';
import { FormatType } from '@shared/enums/format-type.enum';

export const INPUT_CONVERTERS = 'INPUT_CONVERTERS';

export const inputConvertersProvider = {
  provide: INPUT_CONVERTERS,
  useValue: {
    [FormatType.STRING]: new StringToJsonInputConverter(),
    [FormatType.JSON]: new JsonToJsonInputConverter(),
    [FormatType.XML]: new XmlToJsonInputConverter(),
  },
};
