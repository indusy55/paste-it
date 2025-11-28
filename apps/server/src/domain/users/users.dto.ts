import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty() @IsEmail()
  email: string

  @MinLength(8) @MaxLength(18)
  password: string

  avatar?: string
  is_admin?: boolean
}

export class UpdateUserDTO {
  @IsNotEmpty()
  name: string

  @IsNotEmpty() @IsEmail()
  email: string

  @MinLength(8) @MaxLength(18)
  password: string

  avatar?: string
  is_admin?: boolean
}