import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { UPLOAD_ROOT } from "./uploads/uploads.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const webOrigin = process.env.WEB_ORIGIN ?? "http://localhost:3002";
  app.enableCors({
    origin: webOrigin,
    credentials: true
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix("");

  // Serve uploaded images at /uploads/* (e.g. /uploads/products/<uuid>.jpg).
  // These bytes are user-supplied, so they must never be sniffed into an
  // executable content type or allowed to run script against this origin.
  app.useStaticAssets(UPLOAD_ROOT, {
    prefix: "/uploads/",
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
      res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    }
  });

  const port = Number(process.env.PORT ?? 4000);
  await app.listen(port);
  console.log(`API listening on http://localhost:${port}  (web origin: ${webOrigin})`);
}

bootstrap();
