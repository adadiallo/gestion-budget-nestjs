import { Module } from '@nestjs/common';
import { DepensesService } from './depenses.service';
import { DepensesController } from './depenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depense } from './entities/depense.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Depense])],
  
  controllers: [DepensesController],
  providers: [DepensesService],
})
export class DepensesModule {}
