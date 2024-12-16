import { InputConverter } from '@shared/interfaces/converters';
import { convertStringToJson } from '@shared/utils/string-to-json.converter';

export class StringToJsonInputConverter implements InputConverter {
  convertToJson(
    file: string,
    elementSeparator: string,
    lineSeparator: string,
  ): any {
    return convertStringToJson(file, elementSeparator, lineSeparator);
  }
}
