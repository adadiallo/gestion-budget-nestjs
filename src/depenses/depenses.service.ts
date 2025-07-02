import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepenseDto } from './dto/create-depense.dto';
import { UpdateDepenseDto } from './dto/update-depense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Depense } from './entities/depense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepensesService {
  constructor(
    @InjectRepository(Depense)
    private depensesRepository: Repository<Depense>,
  ) {}

  async create(createDepenseDto: CreateDepenseDto): Promise<Depense> {
    const { id, titre, montant } = createDepenseDto;

    const newDepense = this.depensesRepository.create({
      titre,
      montant,
      id,
    });
    return this.depensesRepository.save(newDepense);
  }

  async findAll(): Promise<Depense[]> {
    return this.depensesRepository.find();
  }

  async findOne(id: string): Promise<Depense> {
    const depense = await this.depensesRepository.findOne({
      where: { id },
    });
    if (!depense) {
      throw new NotFoundException(
        `Depense avec l'ID ${id} n'a pas été trouvé.`,
      );
    }
    return depense;
  }

  async update(
    id: string,
    updateDepenseDto: UpdateDepenseDto,
  ): Promise<Depense> {
    const depenseToUpdate = await this.depensesRepository.preload({
      id: id,
      ...updateDepenseDto,
    });
    if (!depenseToUpdate) {
      throw new NotFoundException(`Depense avec l'ID ${id} n'a pas ete trouve`);
    }
    return this.depensesRepository.save(depenseToUpdate);
  }

  async remove(id: string): Promise<void> {
    const result = await this.depensesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Depense avec l'ID ${id} n'a pas été trouvé.`,
      );
    }
  }
}
