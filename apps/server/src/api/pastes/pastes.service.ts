import { randomBytes } from 'node:crypto'
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PasteCreateWithoutSnapshotsInput, PasteUpdateInput } from 'generated/prisma/models';

@Injectable()
export class PastesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPaste(createInput: PasteCreateWithoutSnapshotsInput) {
    return this.prismaService.paste.create({
      data: createInput,
      omit: {
        id: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async getPaste(id: string) {
    return this.prismaService.paste.findFirst({
      where: {
        id,
        is_deleted: false,
      },
      omit: {
        is_deleted: true,
      },
    });
  }

    async getPasteBySlug(slug: string) {
    return this.prismaService.paste.findUnique({
      where: {
        slug,
        is_deleted: false,
      },
      omit: {
        is_deleted: true,
      },
    });
  }

  async getPastes() {
    return this.prismaService.paste.findMany({
      where: {
        is_deleted: false,
      },
      omit: {
        is_deleted: true,
      },
    });
  }

  async updatePaste(id: string, updateInput: PasteUpdateInput) {
    return this.prismaService.paste.update({
      where: {
        id,
      },
      data: updateInput,
      omit: {
        id: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async deletePaste(id: string) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
      },
    });
  }

  async destroyPaste(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
