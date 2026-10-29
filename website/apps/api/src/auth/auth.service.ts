import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";

// A valid cost-10 bcrypt hash of a random string, compared against when the
// email doesn't exist so both paths cost the same. Never matches a real password.
const DUMMY_HASH =
  "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Always run one bcrypt compare, even for an unknown email. Returning
    // early on `!user` skipped the ~100ms hash and let an attacker tell
    // registered addresses from unregistered ones by response latency alone.
    const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);
    if (!user || !ok) throw new UnauthorizedException("Invalid credentials");

    const token = await this.jwt.signAsync({
      sub: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, role: true }
    });
    if (!user) throw new UnauthorizedException("Session invalid");
    return user;
  }
}
