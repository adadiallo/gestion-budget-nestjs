import { Test, TestingModule } from '@nestjs/testing';
import { DepensesController } from './depenses.controller';
import { DepensesService } from './depenses.service';

describe('DepensesController', () => {
  let controller: DepensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepensesController],
      providers: [DepensesService],
    }).compile();

    controller = module.get<DepensesController>(DepensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
