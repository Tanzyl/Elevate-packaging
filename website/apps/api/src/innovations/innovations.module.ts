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
import { IsBoolean, IsInt, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

class CreateInnovationDto {
  @IsString() @MinLength(2) slug!: string;
  @IsString() @MinLength(2) title!: string;
  @IsString() @MinLength(2) summary!: string;
  @IsString() @MinLength(2) body!: string;
  @IsOptional() @IsString() coverUrl?: string;
  @IsOptional() @IsString() videoUrl?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateInnovationDto {
  @IsOptional() @IsString() @MinLength(2) slug?: string;
  @IsOptional() @IsString() @MinLength(2) title?: string;
  @IsOptional() @IsString() @MinLength(2) summary?: string;
  @IsOptional() @IsString() @MinLength(2) body?: string;
  @IsOptional() @IsString() coverUrl?: string;
  @IsOptional() @IsString() videoUrl?: string;
  @IsOptional() @IsBoolean() featured?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class InnovationsService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.innovation.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  }

  adminList() {
    return this.prisma.innovation.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  }

  async bySlug(slug: string) {
    // Public route: published only (see products.service.ts bySlug).
    const i = await this.prisma.innovation.findFirst({
      where: { slug, published: true }
    });
    if (!i) throw new NotFoundException("Innovation not found");
    return i;
  }

  create(dto: CreateInnovationDto) {
    return this.prisma.innovation.create({ data: dto });
  }

  async update(id: string, dto: UpdateInnovationDto) {
    try {
      return await this.prisma.innovation.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Innovation not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.innovation.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Innovation not found");
    }
  }
}

@Controller("innovations")
class InnovationsController {
  constructor(private readonly svc: InnovationsService) {}

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
  create(@Body() dto: CreateInnovationDto) {
    return this.svc.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateInnovationDto) {
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
  controllers: [InnovationsController],
  providers: [InnovationsService]
})
export class InnovationsModule {}
