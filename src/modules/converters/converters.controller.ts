import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConvertRequestDto } from '@shared/dtos/convert-request.dto';
import { ConvertersService } from './converters.service';

@Controller('convert')
export class ConvertersController {
  constructor(private convertersService: ConvertersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async convertFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ConvertRequestDto,
  ): Promise<string> {
    const { inputFormat, outputFormat, elementSeparator, lineSeparator } = body;

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileContent = file.buffer.toString('utf8');

    return this.convertersService.convert(
      inputFormat,
      outputFormat,
      fileContent,
      elementSeparator,
      lineSeparator,
    );
  }
}
