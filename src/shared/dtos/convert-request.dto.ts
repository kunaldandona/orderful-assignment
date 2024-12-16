import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FormatType } from '@shared/enums/format-type.enum';

export class ConvertRequestDto {
  @IsEnum(FormatType)
  inputFormat: FormatType;

  @IsEnum(FormatType)
  outputFormat: FormatType;

  @IsString()
  @IsOptional()
  elementSeparator: string = '*';

  @IsString()
  @IsOptional()
  lineSeparator: string = '~';
}
