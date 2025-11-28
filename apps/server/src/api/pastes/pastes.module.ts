import { Module } from "@nestjs/common";
import { PastesService } from "./pastes.service";
import { PrismaService } from "../../prisma/prisma.service";
import { PastesController } from "./pastes.controller";

@Module({
    controllers: [PastesController],
    providers: [PastesService, PrismaService],
    exports: [PastesService, PrismaService]
})
export class PastesModule {}