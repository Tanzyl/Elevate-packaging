import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Module,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MinLength
} from "class-validator";
import { Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

class CreateNewsDto {
  @IsString() @MinLength(2) slug!: string;
  @IsString() @MinLength(2) title!: string;
  @IsString() @MinLength(2) excerpt!: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsString() coverUrl?: string;
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateNewsDto {
  @IsOptional() @IsString() @MinLength(2) slug?: string;
  @IsOptional() @IsString() @MinLength(2) title?: string;
  @IsOptional() @IsString() @MinLength(2) excerpt?: string;
  @IsOptional() @IsString() body?: string;
  @IsOptional() @IsString() coverUrl?: string;
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.newsPost.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { date: "desc" }]
    });
  }

  adminList() {
    return this.prisma.newsPost.findMany({
      orderBy: [{ order: "asc" }, { date: "desc" }]
    });
  }

  create(dto: CreateNewsDto) {
    return this.prisma.newsPost.create({ data: dto });
  }

  async update(id: string, dto: UpdateNewsDto) {
    try {
      return await this.prisma.newsPost.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("News post not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.newsPost.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("News post not found");
    }
  }
}

@Controller("news")
class NewsController {
  constructor(private readonly svc: NewsService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Get("admin/list")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  adminList() {
    return this.svc.adminList();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() dto: CreateNewsDto) {
    return this.svc.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateNewsDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}

@Module({
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
