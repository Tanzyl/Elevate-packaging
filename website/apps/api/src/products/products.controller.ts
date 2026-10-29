import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { ProductsService } from "./products.service";
import { CreateProductDto, UpdateProductDto } from "./dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller("products")
export class ProductsController {
  constructor(private readonly svc: ProductsService) {}

  // Public: published only by default. Admin can pass ?all=true to see drafts via the
  // admin/list endpoint below.
  @Get()
  list(
    @Query("category") category?: string,
    @Query("featured") featured?: string
  ) {
    return this.svc.list({
      categorySlug: category,
      published: true,
      featured: featured === "true" ? true : undefined
    });
  }

  // Admin-only listing returns drafts too, useful for the dashboard tables
  @Get("admin/list")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  adminList(@Query("category") category?: string) {
    return this.svc.list({ categorySlug: category });
  }

  @Get(":slug")
  bySlug(@Param("slug") slug: string) {
    return this.svc.bySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  create(@Body() dto: CreateProductDto) {
    return this.svc.create(dto);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateProductDto) {
    return this.svc.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
  }
}
