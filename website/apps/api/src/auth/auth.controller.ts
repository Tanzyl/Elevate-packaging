import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";
import { IsEmail, IsString, MinLength } from "class-validator";
import { ConfigService } from "@nestjs/config";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { SESSION_COOKIE } from "./jwt.strategy";

class LoginDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(6) password!: string;
}

@Controller("auth")
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly cfg: ConfigService
  ) {}

  private cookieOptions() {
    const days = Number(this.cfg.get("SESSION_DAYS") ?? 7);
    return {
      httpOnly: true,
      // Secure by default. This used to key off NODE_ENV === "production",
      // and nothing in package.json sets NODE_ENV — so a TLS deploy that
      // forgot the env var would have shipped the session cookie over plain
      // HTTP. Local HTTP dev opts out explicitly instead.
      secure: process.env.COOKIE_INSECURE !== "true",
      sameSite: "lax" as const,
      path: "/",
      maxAge: days * 24 * 60 * 60 * 1000
    };
  }

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { token, user } = await this.auth.login(dto.email, dto.password);
    res.cookie(SESSION_COOKIE, token, this.cookieOptions());
    return { user };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(SESSION_COOKIE, { ...this.cookieOptions(), maxAge: 0 });
    return { ok: true };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request) {
    const u = req.user as { userId: string };
    const user = await this.auth.findById(u.userId);
    return { user };
  }
}
