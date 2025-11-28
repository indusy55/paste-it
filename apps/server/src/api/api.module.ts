import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UsersController } from "./users/users.controller";

@Module({
    controllers: [UsersController],
    imports: [DomainModule]
})
export class ApiModule {}