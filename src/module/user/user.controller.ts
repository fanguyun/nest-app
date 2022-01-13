import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  msg: string;
}

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: '获取用户列表' })
  // GET /user/users
  @Get('users')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({ summary: '查找用户信息' })
  // GET /user/:_id
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<User> {
    return await this.userService.findById(_id);
  }

  @ApiOperation({ summary: '新增用户' })
  // POST /user
  @Post()
  // @Header('Content-Type', 'application/json')
  async addOne(@Body() body: CreateUserDTO): Promise<void> {
    await this.userService.addUser(body);
  }

  @ApiOperation({ summary: '更新用户信息' })
  // PUT /user/:_id
  @Put(':_id')
  async updateOne(
    @Param('_id') _id: string,
    @Body() body: CreateUserDTO,
  ): Promise<void> {
    await this.userService.editUser(_id, body);
  }

  @ApiOperation({ summary: '删除用户' })
  // DELETE /user/:_id
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<void> {
    await this.userService.deleteUser(_id);
  }
}
