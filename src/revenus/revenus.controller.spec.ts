import { Test, TestingModule } from '@nestjs/testing';
import { RevenusController } from './revenus.controller';

describe('RevenusController', () => {
  let controller: RevenusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevenusController],
    }).compile();

    controller = module.get<RevenusController>(RevenusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
