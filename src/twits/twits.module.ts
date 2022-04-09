import { Module } from '@nestjs/common';
import { TwitsService } from './twits.service';
import { TwitsController } from './twits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twit } from './entities/twit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Twit])],
  controllers: [TwitsController],
  providers: [TwitsService],
  exports: [TwitsService],
})
export class TwitsModule {}
