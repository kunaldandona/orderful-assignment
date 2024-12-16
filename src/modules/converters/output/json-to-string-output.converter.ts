import { OutputConverter } from '@shared/interfaces/converters';
import { convertJsonToString } from '@shared/utils/json-to-string.converter';

export class JsonToStringOutputConverter implements OutputConverter {
  convertFromJson(
    json: any,
    elementSeparator: string = '*',
    lineSeparator: string = '~',
  ): string {
    return convertJsonToString(json, elementSeparator, lineSeparator);
  }
}
