import { InputConverter } from '@shared/interfaces/converters';

export class JsonToJsonInputConverter implements InputConverter {
  convertToJson(file: string): any {
    return JSON.parse(file);
  }
}
