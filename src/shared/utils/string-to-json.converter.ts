export function convertStringToJson(
  input: string,
  elementSeparator: string,
  lineSeparator: string,
): any {
  const segments = input.split(lineSeparator).filter(Boolean);
  const result: Record<string, any[]> = {};

  segments.forEach((segment) => {
    const parts = segment.split(elementSeparator).filter(Boolean);
    const segmentName = parts[0];
    const elements = parts.slice(1);

    if (!result[segmentName]) {
      result[segmentName] = [];
    }
    const elementObj: Record<string, string> = {};
    elements.forEach((el, i) => {
      elementObj[`${segmentName}${i + 1}`] = el;
    });
    result[segmentName].push(elementObj);
  });

  return result;
}
