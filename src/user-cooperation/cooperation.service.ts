import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Cooperation } from './cooperation.entity';

@Injectable()
export class CooperationService {
  constructor(
    @InjectRepository(Cooperation)
    private cooperationsRepository: Repository<Cooperation>,
  ) {}

  findAll(): Promise<Cooperation[]> {
    return this.cooperationsRepository.find();
  }

  findOne(id: number): Promise<Cooperation> {
    return this.cooperationsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.cooperationsRepository.delete(id);
  }
}
