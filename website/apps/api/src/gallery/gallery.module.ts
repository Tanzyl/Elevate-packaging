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

class CreateGalleryDto {
  @IsString() @MinLength(1) imageUrl!: string;
  @IsOptional() @IsString() caption?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateGalleryDto {
  @IsOptional() @IsString() @MinLength(1) imageUrl?: string;
  @IsOptional() @IsString() caption?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.galleryImage.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  }

  adminList() {
    return this.prisma.galleryImage.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  }

  create(dto: CreateGalleryDto) {
    return this.prisma.galleryImage.create({ data: dto });
  }

  async update(id: string, dto: UpdateGalleryDto) {
    try {
      return await this.prisma.galleryImage.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Gallery image not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.galleryImage.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Gallery image not found");
    }
  }
}

@Controller("gallery")
class GalleryController {
  constructor(private readonly svc: GalleryService) {}

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
  create(@Body() dto: CreateGalleryDto) {
    return this.svc.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateGalleryDto) {
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
  controllers: [GalleryController],
  providers: [GalleryService]
})
export class GalleryModule {}
