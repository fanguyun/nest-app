import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from '../middleware/logger/logger.middleware';
import { AdminController } from '../view/admin/admin.controller';
import { CatsModule } from '../view/cats/cats.module';
import { UserModule } from '../view/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

//  根模块
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://fanguyn214:fan2850331@cluster0.3gbos.mongodb.net/nest?retryWrites=true&w=majority`,
    ),
    CatsModule,
    UserModule,
  ],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // 中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
