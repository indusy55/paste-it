import { Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UserController } from "./user/user.controller";

@Module({
    controllers: [UserController],
    imports: [DomainModule]
})
export class ApiModule {}