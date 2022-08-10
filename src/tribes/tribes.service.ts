import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tribes } from 'src/entities';
import { TribeNotFoundException } from 'src/exceptions/TribeNotFoundException';
import { Repository } from 'typeorm';

@Injectable()
export class TribesService {
    constructor(@InjectRepository(Tribes) private readonly tribesRepository: Repository<Tribes>) {}

    async getTribe(idTribe: number): Promise<Tribes> {
        const response = await this.tribesRepository.findOne({ where: { id: idTribe }, relations: ['organization'] });
        if (!response) {
            throw new TribeNotFoundException();
        }
        return response;
    }
}
