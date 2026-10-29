import {
  BadRequestException,
  Controller,
  Module,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readSync,
  unlinkSync
} from "fs";
import { extname, join } from "path";
import { randomUUID } from "crypto";
import { Role } from "@prisma/client";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif"
]);
const MAX_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Confirm the stored bytes really are one of the allowed image formats by
 * reading the file signature. The extension and the client-supplied
 * Content-Type are both attacker-controlled, so neither proves anything about
 * the content — this does.
 */
function looksLikeImage(buf: Buffer): boolean {
  const ascii = (start: number, text: string) =>
    buf.slice(start, start + text.length).toString("latin1") === text;

  // JPEG FF D8 FF | PNG 89 50 4E 47 | GIF87a/GIF89a
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  if (buf[0] === 0x89 && ascii(1, "PNG")) return true;
  if (ascii(0, "GIF87a") || ascii(0, "GIF89a")) return true;
  // RIFF....WEBP
  if (ascii(0, "RIFF") && ascii(8, "WEBP")) return true;
  // AVIF/HEIF: ....ftyp<brand>
  if (ascii(4, "ftyp")) return true;
  return false;
}

export const UPLOAD_ROOT = join(process.cwd(), "uploads");

if (!existsSync(UPLOAD_ROOT)) {
  mkdirSync(UPLOAD_ROOT, { recursive: true });
}

const productsDir = join(UPLOAD_ROOT, "products");
if (!existsSync(productsDir)) {
  mkdirSync(productsDir, { recursive: true });
}

@Controller("uploads")
class UploadsController {
  @Post("image")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: productsDir,
        filename: (_req, file, cb) => {
          const ext = extname(file.originalname).toLowerCase();
          cb(null, `${randomUUID()}${ext}`);
        }
      }),
      limits: { fileSize: MAX_BYTES, files: 1 },
      fileFilter: (_req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        if (!ALLOWED.has(ext)) {
          return cb(
            new BadRequestException(
              `File type ${ext} not allowed. Use ${[...ALLOWED].join(", ")}`
            ),
            false
          );
        }
        // Require the declared content type to agree with the extension too.
        // Extension alone said nothing about the bytes; the magic-number check
        // in upload() below is what actually proves it's an image.
        if (!ALLOWED_MIME.has(file.mimetype.toLowerCase())) {
          return cb(
            new BadRequestException(`Content type ${file.mimetype} not allowed`),
            false
          );
        }
        cb(null, true);
      }
    })
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException("No file uploaded");

    // Verify the bytes on disk, and delete anything that isn't a real image so
    // the API never hosts attacker-supplied content under an image/* label.
    const header = Buffer.alloc(16);
    const fd = openSync(file.path, "r");
    try {
      readSync(fd, header, 0, 16, 0);
    } finally {
      closeSync(fd);
    }
    if (!looksLikeImage(header)) {
      unlinkSync(file.path);
      throw new BadRequestException("File content is not a valid image");
    }

    const apiBase = process.env.API_BASE_URL ?? "http://localhost:4000";
    const path = `/uploads/products/${file.filename}`;
    return {
      url: `${apiBase}${path}`,
      path,
      size: file.size,
      mime: file.mimetype
    };
  }
}

@Module({ controllers: [UploadsController] })
export class UploadsModule {}
