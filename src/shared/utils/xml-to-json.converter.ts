import { parseStringPromise } from 'xml2js';

export async function convertXmlToJson(xml: string): Promise<any> {
  const options = {
    explicitArray: false,
    explicitRoot: false,
    trim: true,
  };

  try {
    const json = await parseStringPromise(xml, options);

    const normalizeJson = (obj: any): any => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        } else if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map((item) =>
            typeof item === 'object' ? normalizeJson(item) : item,
          );
        }
      }
      return obj;
    };

    return normalizeJson(json);
  } catch {
    throw new Error('Error parsing XML');
  }
}
