import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles/roles.guard';
import { LoggingInterceptor } from 'src/interceptor/logging/logging.interceptor';
import { Cat } from 'src/interface/cat.interface';
import { CreateCatSchema } from 'src/joi-schema/cat-schema';
import { ParseIntPipe } from 'src/pipe/parse-init/parse-int.pipe';
import { ValidationPipe } from 'src/pipe/validate/validate.pipe';
import { CreateCatDto } from '../../dto/cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
@UseGuards(RolesGuard) // 绑定守卫
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  //get /cats/list
  @Get('list')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  findAll(@Req() request: Request): any {
    try {
      const list: Cat[] = this.catsService.list();
      return {
        code: 1,
        msg: 'success',
        data: list,
      };
    } catch (error) {
      // 异常处理
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // post /cats/add
  @Post('add')
  @UsePipes(new ValidationPipe(CreateCatSchema))
  create(@Body() createCatDto: CreateCatDto): any {
    console.log('createCatDto', createCatDto);
    this.catsService.add(createCatDto);
    return {
      code: 1,
      msg: 'success',
      data: 'new cats',
    };
  }

  // 重定向 /cats/docs | /cats/docs?version=number
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) // 重定向
  getDocs(@Query('version') version) {
    // 获取query参数
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // 路由参数
  @Get(':id')
  @Roles('admin')
  findOne(@Param('id', new ParseIntPipe()) id): any {
    console.log(id);
    return {
      code: 1,
      msg: 'success',
      data: `${id}#new cats`,
    };
  }
}
