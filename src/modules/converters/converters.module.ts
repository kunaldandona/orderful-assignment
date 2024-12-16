import { Module } from '@nestjs/common';
import { ConvertersService } from './converters.service';
import { inputConvertersProvider } from './providers/input-converters.provider';
import { outputConvertersProvider } from './providers/output-converters.provider';
import { ConvertersController } from './converters.controller';

@Module({
  providers: [
    ConvertersService,
    inputConvertersProvider,
    outputConvertersProvider,
  ],
  controllers: [ConvertersController],
})
export class ConvertersModule {}
