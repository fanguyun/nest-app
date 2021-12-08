import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
// import { RolesGuard } from './app/guard/roles/roles.guard';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { customStyleStr } from './config';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoggingInterceptor } from './interceptor/logging/logging.interceptor';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalGuards(new AuthGuard()); // 全局守卫
  app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器
  const config = new DocumentBuilder()
    .setTitle('Nest API DOCS')
    .setDescription('基于Nest的Node API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true,
    customCss: customStyleStr,
  };
  SwaggerModule.setup('api-doc', app, document, options);
  app.useStaticAssets(join(__dirname, '../public'));
  const port = process.env.PORT || 3000;
  // app.use(); 全局中间件
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/');
  });
}
bootstrap();
