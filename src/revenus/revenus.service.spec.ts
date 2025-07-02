import { Test, TestingModule } from '@nestjs/testing';
import { RevenusService } from './revenus.service';
import { NotFoundException } from '@nestjs/common';

describe('RevenusService', () => {
  let service: RevenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevenusService],
    }).compile();

    service = module.get<RevenusService>(RevenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });




});
