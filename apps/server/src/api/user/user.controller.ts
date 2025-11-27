import { Controller, Get } from "@nestjs/common";
import { UserService } from "../../domain/user/user.service";

@Controller('/user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get('/list')
    async getUserList() {
        const result = await this.userService.getUserList()

        return result
    }
}