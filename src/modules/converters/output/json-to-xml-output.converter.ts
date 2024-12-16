import { OutputConverter } from '@shared/interfaces/converters';
import { convertJsonToXml } from '@shared/utils/json-to-xml.converter';

export class JsonToXmlOutputConverter implements OutputConverter {
  convertFromJson(json: any): string {
    return convertJsonToXml(json);
  }
}
