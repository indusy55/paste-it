import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CollectionCreateInput, CollectionUpdateInput } from "generated/prisma/models";

@Injectable()
export class CollectionsService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly collectionInclude = {
    pastes: {
      where: {
        is_deleted: false,
      },
      omit: {
        is_deleted: true,
      },
    },
  } as const;

  async createCollection(createInput: CollectionCreateInput) {
    return this.prismaService.collection.create({
      data: createInput,
      include: this.collectionInclude,
      omit: {
        id: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async getCollection(id: string) {
    return this.prismaService.collection.findFirst({
      where: {
        id,
        is_deleted: false,
      },
      include: this.collectionInclude,
      omit: {
        is_deleted: true,
      },
    });
  }

  async getCollectionBySlug(slug: string) {
    return this.prismaService.collection.findUnique({
      where: {
        slug,
        is_deleted: false,
      },
      include: this.collectionInclude,
      omit: {
        is_deleted: true,
      },
    });
  }

  async getCollections() {
    return this.prismaService.collection.findMany({
      where: {
        is_deleted: false,
      },
      include: this.collectionInclude,
      omit: {
        is_deleted: true,
      },
    });
  }

  async updateCollection(id: string, updateInput: CollectionUpdateInput) {
    return this.prismaService.collection.update({
      where: {
        id,
        is_deleted: false,
      },
      data: updateInput,
      include: this.collectionInclude,
      omit: {
        id: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async deleteCollection(id: string) {
    return this.prismaService.collection.update({
      where: {
        id,
        is_deleted: false,
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
