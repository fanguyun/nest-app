import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../middleware/logger.middleware';
import { AdminController } from '../view/admin/admin.controller';
import { CatsModule } from '../view/cats/cats.module';

//  根模块
@Module({
  imports: [CatsModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
