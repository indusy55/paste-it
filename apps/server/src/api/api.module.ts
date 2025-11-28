import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PastesModule } from "./pastes/pastes.module";

@Module({
    imports: [UsersModule, PastesModule],
    providers: []
})
export class ApiModule {}