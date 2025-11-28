import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  name: string;

  @IsString()
  @IsNotEmpty({ message: "邮箱不能为空" })
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: "密码必须包含小写字母、大写字母与数字" }
  )
  @MinLength(8, { message: "密码长度不能小于8个字符" })
  @MaxLength(18, { message: "密码长度不能大于18个字符" })
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  is_admin?: boolean;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "用户名不能为空" })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "邮箱不能为空" })
  @IsEmail(undefined, { message: "邮箱不符合规则" })
  email?: string;

  @IsOptional()
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    { message: "密码必须包含小写字母、大写字母与数字" }
  )
  @MinLength(8, { message: "密码长度不能小于8个字符" })
  @MaxLength(18, { message: "密码长度不能大于18个字符" })
  password?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
  
  @IsOptional()
  @IsBoolean()
  is_admin?: boolean;
}
