// 数据传输对象（DTO)(Data Transfer Object)，是一种设计模式之间传输数据的软件应用系统

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

/* 问题： 为什么不用interface 而要使用class来声明DTO?
 * 我们都知道Typescript接口在编译过程中是被删除的，其次后面我们要给参数加说明,使用Swagger的装饰器，interface也是无法实现的
 */
export class CreateUserDTO {
  /**
   * A list of user's roles
   * @example '00001'
   */
  @ApiProperty({ description: '用户ID' })
  @IsNotEmpty({ message: '用户ID必填' })
  @IsNumber()
  readonly _id: string;
  @ApiProperty({ description: '用户姓名' })
  @IsNotEmpty({ message: '用户姓名必填' })
  readonly userName: string;
  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '用户密码必填' })
  readonly password: string;
}

export class EditUserDTO {
  @ApiProperty({ description: '用户姓名' })
  readonly userName: string;
  @ApiProperty({ description: '用户密码' })
  readonly password: string;
}
