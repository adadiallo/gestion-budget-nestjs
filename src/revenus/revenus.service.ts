import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRevenuDto } from 'src/depenses/dto/create-revenu.dto';
import { UpdateRevenuDto } from 'src/depenses/dto/update-revenu.dto';
import { Revenu } from 'src/depenses/entities/revenu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RevenusService {
  constructor(
    @InjectRepository(Revenu)
    private revenusRepository: Repository<Revenu>,
  ) {}
 
  async create(createRevenuDto: CreateRevenuDto): Promise<Revenu> {
    const{id,titre,montant}  = createRevenuDto;

    const newRevenu = this.revenusRepository.create({
        titre,
        montant,
        id
    });
    return this.revenusRepository.save(newRevenu)

  }

  async findAll(): Promise<Revenu[]> {
  return this.revenusRepository.find();
}
 async findOne(id: string): Promise<Revenu> {
  const revenu = await this.revenusRepository.findOne({
        where: { id },
  });
   if (!revenu) {
      throw new NotFoundException(`L'article avec l'ID ${id} n'a pas été trouvé.`);
    }
  return revenu;
  
}

    async update(id: string, updateRevenuDto:UpdateRevenuDto): Promise<Revenu>{
        const revenuToUpdate = await this.revenusRepository.preload({
            id:id,
            ...updateRevenuDto,
        });
        if(!revenuToUpdate) {
            throw new NotFoundException(`Revenu avec l'ID ${id} n'a pas ete trouve`)
        }
        return this.revenusRepository.save(revenuToUpdate)
    }

async remove(id: string):Promise<void> {
  const result = await this.revenusRepository.delete(id);
  if (result.affected === 0) {
      throw new NotFoundException(`L'article avec l'ID ${id} n'a pas été trouvé.`);
    }
}
  






}
