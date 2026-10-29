import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy, requireJwtSecret } from "./jwt.strategy";
import { RolesGuard } from "./roles.guard";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: requireJwtSecret(cfg),
        signOptions: { expiresIn: cfg.get<string>("JWT_EXPIRES_IN") ?? "1d" }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, RolesGuard, AuthService]
})
export class AuthModule {}
