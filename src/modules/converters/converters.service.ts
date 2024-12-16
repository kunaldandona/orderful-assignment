// src/converters/converters.service.ts
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InputConverter, OutputConverter } from '@shared/interfaces/converters';
import { FormatType } from '@shared/enums/format-type.enum';
import { INPUT_CONVERTERS } from './providers/input-converters.provider';
import { OUTPUT_CONVERTERS } from './providers/output-converters.provider';

@Injectable()
export class ConvertersService {
  constructor(
    @Inject(INPUT_CONVERTERS)
    private readonly inputConverters: Record<string, InputConverter>,
    @Inject(OUTPUT_CONVERTERS)
    private readonly outputConverters: Record<string, OutputConverter>,
  ) {}

  async convert(
    inputFormat: FormatType,
    outputFormat: FormatType,
    file: string,
    elementSeparator?: string,
    lineSeparator?: string,
  ): Promise<string> {
    if (inputFormat === outputFormat) {
      return file;
    }

    const inputConverter = this.findInputConverter(inputFormat);
    const intermediateJson = await this.convertToJson(
      inputConverter,
      file,
      elementSeparator,
      lineSeparator,
    );

    const outputConverter = this.findOutputConverter(outputFormat);
    return this.convertFromJson(
      outputConverter,
      intermediateJson,
      elementSeparator,
      lineSeparator,
    );
  }

  private async convertToJson(
    converter: InputConverter,
    file: string,
    elementSeparator?: string,
    lineSeparator?: string,
  ): Promise<any> {
    try {
      return await converter.convertToJson(
        file,
        elementSeparator,
        lineSeparator,
      );
    } catch {
      throw new BadRequestException(
        'Invalid file data for the given input format',
      );
    }
  }

  private async convertFromJson(
    converter: OutputConverter,
    json: any,
    elementSeparator?: string,
    lineSeparator?: string,
  ): Promise<string> {
    try {
      return await converter.convertFromJson(
        json,
        elementSeparator,
        lineSeparator,
      );
    } catch {
      throw new BadRequestException(
        'Conversion failed due to invalid data or unsupported type',
      );
    }
  }

  private findInputConverter(inputFormat: FormatType): InputConverter {
    const inputConverter = this.inputConverters[inputFormat];

    if (!inputConverter) {
      throw new BadRequestException('Unsupported input format or file type');
    }

    return inputConverter;
  }

  private findOutputConverter(outputFormat: FormatType): OutputConverter {
    const outputConverter = this.outputConverters[outputFormat];

    if (!outputConverter) {
      throw new BadRequestException('Unsupported output format');
    }

    return outputConverter;
  }
}
