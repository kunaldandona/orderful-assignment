import { OutputConverter } from '@shared/interfaces/converters';

export class JsonToJsonOutputConverter implements OutputConverter {
  convertFromJson(json: any): string {
    return JSON.stringify(json, null, 2);
  }
}
