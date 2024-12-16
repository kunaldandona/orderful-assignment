import { InputConverter } from '@shared/interfaces/converters';
import { convertXmlToJson } from '@shared/utils/xml-to-json.converter';

export class XmlToJsonInputConverter implements InputConverter {
  convertToJson(file: string): Promise<any> {
    return convertXmlToJson(file);
  }
}
