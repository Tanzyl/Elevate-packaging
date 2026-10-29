import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto, UpdateProductDto } from "./dto";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  list(opts: { categorySlug?: string; published?: boolean; featured?: boolean }) {
    return this.prisma.product.findMany({
      where: {
        published: opts.published,
        featured: opts.featured,
        category: opts.categorySlug ? { slug: opts.categorySlug } : undefined
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: { category: true }
    });
  }

  async bySlug(slug: string) {
    // Public route: only published rows. findUnique({ slug }) leaked drafts to
    // anyone who guessed a slug, while list() correctly filtered them out.
    const p = await this.prisma.product.findFirst({
      where: { slug, published: true },
      include: { category: true }
    });
    if (!p) throw new NotFoundException("Product not found");
    return p;
  }

  async byId(id: string) {
    const p = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });
    if (!p) throw new NotFoundException("Product not found");
    return p;
  }

  create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
        finishes: dto.finishes ?? [],
        specs: (dto.specs ?? []) as object,
        gallery: (dto.gallery ?? []) as object
      }
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: {
          ...dto,
          specs: dto.specs as object | undefined,
          gallery: dto.gallery as object | undefined
        }
      });
    } catch {
      throw new NotFoundException("Product not found");
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.product.delete({ where: { id } });
      return { ok: true };
    } catch {
      throw new NotFoundException("Product not found");
    }
  }
}
