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

class CreateVideoDto {
  @IsString() @MinLength(2) title!: string;
  @IsString() @MinLength(2) url!: string;
  @IsOptional() @IsString() caption?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateVideoDto {
  @IsOptional() @IsString() @MinLength(2) title?: string;
  @IsOptional() @IsString() @MinLength(2) url?: string;
  @IsOptional() @IsString() caption?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class VideosService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.video.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  }

  adminList() {
    return this.prisma.video.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }]
    });
  }

  create(dto: CreateVideoDto) {
    return this.prisma.video.create({ data: dto });
  }

  async update(id: string, dto: UpdateVideoDto) {
    try {
      return await this.prisma.video.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Video not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.video.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Video not found");
    }
  }
}

@Controller("videos")
class VideosController {
  constructor(private readonly svc: VideosService) {}

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
  create(@Body() dto: CreateVideoDto) {
    return this.svc.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateVideoDto) {
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
  controllers: [VideosController],
  providers: [VideosService]
})
export class VideosModule {}
