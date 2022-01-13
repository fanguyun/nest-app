import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './user.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // 根据id查找用户
  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  // 添加用户
  async addUser(body: CreateUserDTO): Promise<void> {
    await this.userModel.create(body);
  }

  // 编辑用户
  async editUser(id: string, body: CreateUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, body);
  }

  // 删除用户
  async deleteUser(id: string): Promise<void> {
    const res = await this.userModel.findByIdAndRemove(id);
    if (!res) {
      throw new HttpException('无效的用户ID', 401);
    } else {
      return res._id;
    }
  }
}
