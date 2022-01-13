import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 请求上下文
    const response = ctx.getResponse(); // 响应对象
    const status = exception.getStatus(); // 异常状态码

    // 设置错信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? '服务器错误' : '客户端错误'}`;

    const errorResponse = {
      data: null,
      msg: message,
      code: -1,
    };
    console.error('HttpException ===>', exception.response);

    // 设置状态码、请求头、响应体
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
