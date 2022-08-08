import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organizations } from './entities';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }
}
