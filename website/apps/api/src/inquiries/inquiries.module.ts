import {
  Body,
  Controller,
  Get,
  Injectable,
  Module,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  MinLength
} from "class-validator";
import { Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

class CreateInquiryDto {
  @IsString() @MinLength(2) name!: string;
  @IsOptional() @IsString() company?: string;
  @IsEmail() email!: string;
  @IsString() @MinLength(5) phone!: string;
  @IsOptional() @IsString() address?: string;
  @IsString() @MinLength(2) message!: string;
  @IsOptional() @IsString() source?: string;
}

class UpdateInquiryDto {
  @IsOptional() @IsBoolean() handled?: boolean;
}

@Injectable()
class InquiriesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateInquiryDto) {
    return this.prisma.inquiry.create({ data: dto });
  }

  list(opts: { handled?: boolean }) {
    return this.prisma.inquiry.findMany({
      where: opts.handled === undefined ? {} : { handled: opts.handled },
      orderBy: { createdAt: "desc" },
      take: 250
    });
  }

  async update(id: string, dto: UpdateInquiryDto) {
    try {
      return await this.prisma.inquiry.update({ where: { id }, data: dto });
    } catch {
      throw new NotFoundException("Inquiry not found");
    }
  }
}

@Controller("inquiries")
class InquiriesController {
  constructor(private readonly svc: InquiriesService) {}

  // Public submission (RFQ + contact form)
  @Post()
  create(@Body() dto: CreateInquiryDto) {
    return this.svc.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  list(@Query("handled") handled?: string) {
    return this.svc.list({
      handled: handled === undefined ? undefined : handled === "true"
    });
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  update(@Param("id") id: string, @Body() dto: UpdateInquiryDto) {
    return this.svc.update(id, dto);
  }
}

@Module({
  controllers: [InquiriesController],
  providers: [InquiriesService]
})
export class InquiriesModule {}
