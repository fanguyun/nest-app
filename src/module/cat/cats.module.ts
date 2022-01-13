import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

// 功能模块
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService], // 共享CatsService，每个导入 CatsModule 的模块都可以访问 CatsService ，并且它们将共享相同的 CatsService 实例
})
export class CatsModule {}
