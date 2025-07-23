import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDepenseDto } from './dto/create-depense.dto';
import { UpdateDepenseDto } from './dto/update-depense.dto';
import { Depense } from './entities/depense.entity';

@Injectable()
export class DepensesService {
  constructor(
    @InjectRepository(Depense)
    private depensesRepository: Repository<Depense>,
  ) {}

  async create(createDepenseDto: CreateDepenseDto): Promise<Depense> {
    try {
    const newDepense = this.depensesRepository.create(createDepenseDto);
    return await this.depensesRepository.save(newDepense);
  } catch (error) {
    console.error('❌ ERREUR CREATE DEPENSE:', error);
    throw error;
  }
}

  async findAll(): Promise<Depense[]> {
    return this.depensesRepository.find();
  }

  async findOne(id: number): Promise<Depense> {
    const depense = await this.depensesRepository.findOne({
      where: { id },
    });
    if (!depense) {
      throw new NotFoundException(`Dépense avec l'ID ${id} non trouvée.`);
    }
    return depense;
  }

  async update(id: number, updateDepenseDto: UpdateDepenseDto): Promise<Depense> {
    const depenseToUpdate = await this.depensesRepository.preload({
      id,
      ...updateDepenseDto,
    });
    if (!depenseToUpdate) {
      throw new NotFoundException(`Dépense avec l'ID ${id} non trouvée.`);
    }
    return this.depensesRepository.save(depenseToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.depensesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dépense avec l'ID ${id} non trouvée.`);
    }
  }
}
