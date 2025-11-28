import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCollectionDTO {
  @IsString()
  @IsNotEmpty({ message: "标题不能为空" })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsString()
  secret_hash?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  paste_ids?: string[];
}

export class UpdateCollectionDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "标题不能为空" })
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  cover?: string;

  @IsOptional()
  @IsString()
  secret_hash?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  paste_ids?: string[];
}
