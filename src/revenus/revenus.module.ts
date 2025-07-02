import { Module } from '@nestjs/common';
import { RevenusController } from './revenus.controller';
import { RevenusService } from './revenus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenu } from 'src/depenses/entities/revenu.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Revenu])],
  controllers: [RevenusController],
  providers: [RevenusService]
})
export class RevenusModule {}
