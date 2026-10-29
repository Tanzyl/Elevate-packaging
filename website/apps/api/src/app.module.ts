import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";
import { MarketsModule } from "./markets/markets.module";
import { InquiriesModule } from "./inquiries/inquiries.module";
import { InnovationsModule } from "./innovations/innovations.module";
import { NewsModule } from "./news/news.module";
import { GalleryModule } from "./gallery/gallery.module";
import { VideosModule } from "./videos/videos.module";
import { SiteContentModule } from "./site-content/site-content.module";
import { UploadsModule } from "./uploads/uploads.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ["../../.env", ".env"] }),
    PrismaModule,
    HealthModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    MarketsModule,
    InquiriesModule,
    InnovationsModule,
    NewsModule,
    GalleryModule,
    VideosModule,
    SiteContentModule,
    UploadsModule
  ]
})
export class AppModule {}
