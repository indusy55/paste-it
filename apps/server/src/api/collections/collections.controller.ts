import { nanoid } from "nanoid";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { CollectionsService } from "./collections.service";
import { ResponseInterceptor } from "../../middleware/interceptors/response.interceptor";
import { CreateCollectionDTO, UpdateCollectionDTO } from "./collections.dto";

@Controller("/collections")
@UseInterceptors(ResponseInterceptor)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post("/")
  async createCollection(@Body() createDTO: CreateCollectionDTO) {
    const slug = nanoid(8);
    const result = await this.collectionsService.createCollection({
      slug,
      title: createDTO.title,
      description: createDTO.description,
      cover: createDTO.cover,
      secret_hash: createDTO.secret_hash,
      pastes: createDTO.paste_ids?.length
        ? {
            connect: createDTO.paste_ids.map((pasteId) => ({ id: pasteId })),
          }
        : undefined,
    });

    return this.formatCollection(result);
  }

  @Get("/:id")
  async getCollection(@Param("id") id: string) {
    const result = await this.collectionsService.getCollection(id);
    return this.formatCollection(result);
  }

  @Get("/slug/:slug")
  async getCollectionBySlug(@Param("slug") slug: string) {
    const result = await this.collectionsService.getCollectionBySlug(slug);
    return this.formatCollection(result);
  }

  @Get("/")
  async getCollections() {
    const results = await this.collectionsService.getCollections();
    return results.map((collection) => this.formatCollection(collection));
  }

  @Patch("/:id")
  async updateCollection(
    @Param("id") id: string,
    @Body() updateDTO: UpdateCollectionDTO,
  ) {
    const result = await this.collectionsService.updateCollection(id, {
      title: updateDTO.title,
      description: updateDTO.description,
      cover: updateDTO.cover,
      secret_hash: updateDTO.secret_hash,
      pastes:
        updateDTO.paste_ids !== undefined
          ? {
              set: updateDTO.paste_ids.map((pasteId) => ({ id: pasteId })),
            }
          : undefined,
    });

    return this.formatCollection(result);
  }

  @Delete("/:id")
  async deleteCollection(@Param("id") id: string) {
    return this.collectionsService.deleteCollection(id);
  }

  private formatCollection(collection: any) {
    if (!collection) {
      return collection;
    }

    return {
      ...collection,
      pastes: collection.pastes?.map((paste) => this.formatPaste(paste)) ?? [],
    };
  }

  private formatPaste(paste: any) {
    if (!paste) {
      return paste;
    }

    return {
      ...paste,
      attachments: paste.attachments?.split(","),
    };
  }
}
