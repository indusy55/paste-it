import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePasteDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsNotEmpty({ message: "内容不能为空" })
  content: string;

  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsArray()
  attachments?: string[];

  @IsOptional()
  @IsString()
  secret_hash?: string;

  @IsDateString(undefined, { message: "过期时间格式不正确" })
  @IsNotEmpty({message: '过期时间不能为空'})
  expired_at: string;
}

export class UpdatePasteDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "内容不能为空" })
  content?: string;

  @IsOptional()
  @IsString()
  lang?: string;

  @IsOptional()
  @IsArray()
  attachments?: string[];

  @IsOptional()
  @IsString()
  secret_hash?: string;

  @IsOptional()
  @IsDateString(undefined, { message: "过期时间格式不正确" })
  expired_at?: string;
}
