import { JsonToStringOutputConverter } from '@modules/converters/output/json-to-string-output.converter';
import { JsonToJsonOutputConverter } from '@modules/converters/output/json-to-json-output.converter';
import { JsonToXmlOutputConverter } from '@modules/converters/output/json-to-xml-output.converter';
import { FormatType } from '@shared/enums/format-type.enum';

export const OUTPUT_CONVERTERS = 'OUTPUT_CONVERTERS';

export const outputConvertersProvider = {
  provide: OUTPUT_CONVERTERS,
  useValue: {
    [FormatType.STRING]: new JsonToStringOutputConverter(),
    [FormatType.JSON]: new JsonToJsonOutputConverter(),
    [FormatType.XML]: new JsonToXmlOutputConverter(),
  },
};
