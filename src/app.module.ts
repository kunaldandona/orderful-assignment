import { Module } from '@nestjs/common';
import { ConvertersModule } from './modules/converters/converters.module';

@Module({
  imports: [ConvertersModule],
})
export class AppModule {}
