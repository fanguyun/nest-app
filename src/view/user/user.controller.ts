import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

interface UserResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users
  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'Success.',
    };
  }
  // GET /user/:_id
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponse<User>> {
    return {
      code: 200,
      data: await this.userService.findById(_id),
      message: 'Success.',
    };
  }

  // POST /user
  @Post()
  // @Header('Content-Type', 'application/json')
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
    await this.userService.addUser(body);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  // PUT /user/:_id
  @Put(':_id')
  async updateOne(
    @Param('_id') _id: string,
    @Body() body: CreateUserDTO,
  ): Promise<UserResponse> {
    await this.userService.editUser(_id, body);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  // DELETE /user/:_id
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<UserResponse> {
    await this.userService.deleteUser(_id);
    return {
      code: 200,
      message: 'Success.',
    };
  }
}
