import { IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateCategoryDto {
  @IsString() @MinLength(2) slug!: string;
  @IsString() @MinLength(2) name!: string;
  @IsOptional() @IsString() summary?: string;
  @IsOptional() @IsString() intro?: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateCategoryDto {
  @IsOptional() @IsString() @MinLength(2) slug?: string;
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsString() summary?: string;
  @IsOptional() @IsString() intro?: string;
  @IsOptional() @IsInt() order?: number;
}
