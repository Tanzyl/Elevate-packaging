import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

export class SpecRowDto {
  @IsString() label!: string;
  @IsString() value!: string;
}

export class CreateProductDto {
  @IsString() @MinLength(2) slug!: string;
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(2) summary!: string;

  @IsArray() @IsString({ each: true })
  @ArrayMinSize(1)
  description!: string[];

  @IsArray() @IsString({ each: true })
  applications!: string[];

  @IsArray() @IsString({ each: true })
  features!: string[];

  @IsOptional() @IsArray() @IsString({ each: true })
  finishes?: string[];

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SpecRowDto)
  @ArrayMaxSize(40)
  specs?: SpecRowDto[];

  @IsOptional() @IsArray() @IsString({ each: true })
  gallery?: string[];

  @IsOptional() @IsString() moq?: string;
  @IsOptional() @IsString() leadTime?: string;
  @IsString() categoryId!: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateProductDto {
  @IsOptional() @IsString() @MinLength(2) slug?: string;
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsString() @MinLength(2) summary?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) description?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) applications?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) features?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) finishes?: string[];
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SpecRowDto) specs?: SpecRowDto[];
  @IsOptional() @IsArray() @IsString({ each: true }) gallery?: string[];
  @IsOptional() @IsString() moq?: string;
  @IsOptional() @IsString() leadTime?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
