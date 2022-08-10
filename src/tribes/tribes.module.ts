import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tribes } from 'src/entities';
import { TribesController } from './tribes.controller';
import { TribesService } from './tribes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tribes])],
  controllers: [TribesController],
  providers: [TribesService],
  exports: [TribesService],
})
export class TribesModule {}
