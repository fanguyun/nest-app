import { Controller, Get } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';

// 子域路由
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(@User() user: any): string {
    console.log('user', user);
    return 'Admin page';
  }
}
