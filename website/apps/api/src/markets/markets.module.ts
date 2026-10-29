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
  ArrayMinSize,
  IsArray,
  IsBoolean,
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

class CreateMarketDto {
  @IsString() @MinLength(2) slug!: string;
  @IsString() @MinLength(2) name!: string;
  @IsString() @MinLength(2) leadCopy!: string;
  @IsArray() @IsString({ each: true }) @ArrayMinSize(1) applications!: string[];
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateMarketDto {
  @IsOptional() @IsString() @MinLength(2) slug?: string;
  @IsOptional() @IsString() @MinLength(2) name?: string;
  @IsOptional() @IsString() @MinLength(2) leadCopy?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) applications?: string[];
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class MarketsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.market.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { name: "asc" }]
    });
  }

  adminList() {
    return this.prisma.market.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }]
    });
  }

  async bySlug(slug: string) {
    // Public route: published only (see products.service.ts bySlug).
    const m = await this.prisma.market.findFirst({
      where: { slug, published: true }
    });
    if (!m) throw new NotFoundException("Market not found");
    return m;
  }

  create(dto: CreateMarketDto) {
    return this.prisma.market.create({ data: dto });
  }

  async update(id: string, dto: UpdateMarketDto) {
    try {
      return await this.prisma.market.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Market not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.market.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Market not found");
    }
  }
}

@Controller("markets")
class MarketsController {
  constructor(private readonly svc: MarketsService) {}

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

  @Get(":slug")
  bySlug(@Param("slug") slug: string) {
    return this.svc.bySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() dto: CreateMarketDto) {
    return this.svc.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateMarketDto) {
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
  controllers: [MarketsController],
  providers: [MarketsService]
})
export class MarketsModule {}
