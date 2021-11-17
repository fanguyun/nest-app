import { Injectable, NestMiddleware } from '@nestjs/common';
import Logger from 'node-log-info';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger({
    name: 'nest-app',
  });
  async use(
    req: Request & { baseUrl: string },
    res: Response,
    next: () => void,
  ) {
    this.logger.http(`[${req.method}] [${req.baseUrl}${req.url}]`);
    this.logger.http('Request Header---->:', req.headers);
    this.logger.http('Request Body---->:', req.body);
    // this.logger.http('Response ---->', res);
    await next();
  }
}
