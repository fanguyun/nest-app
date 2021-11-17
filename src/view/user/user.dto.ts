export class CreateUserDTO {
  /**
   * A list of user's roles
   * @example '00001'
   */
  readonly _id: string;
  readonly userName: string;
  readonly password: string;
}

export class EditUserDTO {
  readonly userName: string;
  readonly password: string;
}
