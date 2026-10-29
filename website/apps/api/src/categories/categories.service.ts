import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  list() {
    return this.prisma.productCategory.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: {
        products: {
          where: { published: true },
          orderBy: [{ order: "asc" }, { name: "asc" }]
        }
      }
    });
  }

  async bySlug(slug: string) {
    const cat = await this.prisma.productCategory.findUnique({
      where: { slug },
      include: {
        products: {
          where: { published: true },
          orderBy: [{ order: "asc" }, { name: "asc" }]
        }
      }
    });
    if (!cat) throw new NotFoundException("Category not found");
    return cat;
  }

  create(dto: CreateCategoryDto) {
    return this.prisma.productCategory.create({ data: dto });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    try {
      return await this.prisma.productCategory.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Category not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.productCategory.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Category not found");
    }
  }
}
