// Bundles small site-content models that don't warrant their own folder yet:
//   - Testimonial
//   - Certification

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

/* ------------------------------ Testimonials ------------------------------ */

class CreateTestimonialDto {
  @IsString() @MinLength(2) quote!: string;
  @IsString() @MinLength(2) author!: string;
  @IsString() @MinLength(2) role!: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateTestimonialDto {
  @IsOptional() @IsString() quote?: string;
  @IsOptional() @IsString() author?: string;
  @IsOptional() @IsString() role?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}
  list() {
    return this.prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" }
    });
  }
  adminList() {
    return this.prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  }
  create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({ data: dto });
  }
  async update(id: string, dto: UpdateTestimonialDto) {
    try {
      return await this.prisma.testimonial.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Testimonial not found");
    }
  }
  async remove(id: string) {
    try {
      await this.prisma.testimonial.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Testimonial not found");
    }
  }
}

@Controller("testimonials")
class TestimonialsController {
  constructor(private readonly svc: TestimonialsService) {}
  @Get() list() { return this.svc.list(); }
  @Get("admin/list") @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN, Role.EDITOR)
  adminList() { return this.svc.adminList(); }
  @Post() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() dto: CreateTestimonialDto) { return this.svc.create(dto); }
  @Patch(":id") @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateTestimonialDto) { return this.svc.update(id, dto); }
  @Delete(":id") @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN)
  remove(@Param("id") id: string) { return this.svc.remove(id); }
}

/* ----------------------------- Certifications ----------------------------- */

class CreateCertificationDto {
  @IsString() @MinLength(2) name!: string;
  @IsOptional() @IsString() url?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

class UpdateCertificationDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() url?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

@Injectable()
class CertificationsService {
  constructor(private readonly prisma: PrismaService) {}
  list() {
    return this.prisma.certification.findMany({
      where: { published: true },
      orderBy: { order: "asc" }
    });
  }
  adminList() {
    return this.prisma.certification.findMany({ orderBy: { order: "asc" } });
  }
  create(dto: CreateCertificationDto) {
    return this.prisma.certification.create({ data: dto });
  }
  async update(id: string, dto: UpdateCertificationDto) {
    try {
      return await this.prisma.certification.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Certification not found");
    }
  }
  async remove(id: string) {
    try {
      await this.prisma.certification.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Certification not found");
    }
  }
}

@Controller("certifications")
class CertificationsController {
  constructor(private readonly svc: CertificationsService) {}
  @Get() list() { return this.svc.list(); }
  @Get("admin/list") @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN, Role.EDITOR)
  adminList() { return this.svc.adminList(); }
  @Post() @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() dto: CreateCertificationDto) { return this.svc.create(dto); }
  @Patch(":id") @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateCertificationDto) { return this.svc.update(id, dto); }
  @Delete(":id") @UseGuards(JwtAuthGuard, RolesGuard) @Roles(Role.ADMIN)
  remove(@Param("id") id: string) { return this.svc.remove(id); }
}

@Module({
  controllers: [TestimonialsController, CertificationsController],
  providers: [TestimonialsService, CertificationsService]
})
export class SiteContentModule {}
