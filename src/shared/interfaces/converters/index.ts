export interface InputConverter {
  convertToJson(
    file: string,
    elementSeparator?: string,
    lineSeparator?: string,
  ): Promise<any> | any;
}

export interface OutputConverter {
  convertFromJson(
    json: any,
    elementSeparator?: string,
    lineSeparator?: string,
  ): Promise<string> | string;
}
