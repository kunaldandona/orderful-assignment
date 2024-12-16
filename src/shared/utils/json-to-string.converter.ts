export function convertJsonToString(
  json: Record<string, any[]> | null | undefined,
  elementSeparator: string,
  lineSeparator: string,
): string {
  if (!json || typeof json !== 'object') {
    throw new Error('Invalid input: json must be a non-null object.');
  }

  const segments: string[] = [];
  for (const segmentName in json) {
    const segmentArray = json[segmentName];

    if (!Array.isArray(segmentArray)) {
      throw new Error(`Invalid input: ${segmentName} is not an array.`);
    }

    segmentArray.forEach((obj: Record<string, any>) => {
      const elements = Object.values(obj);
      segments.push([segmentName, ...elements].join(elementSeparator));
    });
  }

  return (
    segments.join(lineSeparator) + (segments.length > 0 ? lineSeparator : '')
  );
}
