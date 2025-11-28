import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PastesModule } from "./pastes/pastes.module";
import { CollectionsModule } from "./collections/collections.module";

@Module({
    imports: [UsersModule, PastesModule, CollectionsModule],
    providers: []
})
export class ApiModule {}
