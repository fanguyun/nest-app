import { Inject, Injectable, Optional } from '@nestjs/common';
import { Cat } from './cat.interface';

@Injectable()
export class CatsService {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: any, // 可选依赖注入
  ) {}

  private readonly cats: Cat[] = [
    {
      name: '乐乐',
      age: 5,
      breed: 'meiduan',
    },
  ];

  add(cat: Cat) {
    this.cats.push(cat);
  }

  list(): Cat[] {
    return this.cats;
  }
}
