import { nanoid } from 'nanoid'
import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { PastesService } from "./pastes.service";
import { ResponseInterceptor } from "../../middleware/interceptors/response.interceptor";
import { CreatePasteDTO, UpdatePasteDTO } from "./pastes.dto";

@Controller("/pastes")
@UseInterceptors(ResponseInterceptor)
export class PastesController {
  constructor(private readonly pastesService: PastesService) {}

  @Post("/")
  async createPaste(@Body() createDTO: CreatePasteDTO) {
    const slug = nanoid(8)

    return this.pastesService.createPaste({
      ...createDTO,
      slug,
      attachments: createDTO.attachments?.join(',')
    });
  }

  @Get("/:id")
  async getPaste(@Param("id") id: string) {
    const result = await this.pastesService.getPaste(id);
    
    return result ? {
      ...result,
      attachments: result?.attachments?.split(',')
    } : null;
  }

    @Get("/slug/:slug")
  async getPasteBySlug(@Param("slug") slug: string) {
    const result = await this.pastesService.getPasteBySlug(slug);
    
    return result ? {
      ...result,
      attachments: result?.attachments?.split(',')
    } : null;
  }

  @Get("/")
  async getPastes() {
    const results = await this.pastesService.getPastes();
    return results.map(result => ({
      ...result,
      attachments: result?.attachments?.split(',')
    }))
  }

  @Delete('/:id')
  async deletePaste(@Param("id") id: string) {
    return this.pastesService.deletePaste(id)
  }

  @Patch("/:id")
  async updatePaste(@Param("id") id: string, @Body() updateDTO: UpdatePasteDTO) {
    return this.pastesService.updatePaste(id, {
      ...updateDTO,
      attachments: updateDTO.attachments?.join(',')
    });
  }
}
