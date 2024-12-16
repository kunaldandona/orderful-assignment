import { Builder } from 'xml2js';

export function convertJsonToXml(jsonObject: any): string {
  if (typeof jsonObject === 'string') {
    jsonObject = JSON.parse(jsonObject);
  }

  const wrapped = { root: jsonObject };

  const builder = new Builder({
    headless: false,
    renderOpts: { pretty: true },
  });

  return builder.buildObject(wrapped);
}
