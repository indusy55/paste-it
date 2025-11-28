import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO, UpdateUserDTO } from "src/api/users/users.dto";
import { ResponseInterceptor } from "../../middleware/interceptors/response.interceptor";

@Controller("/users")
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post("/")
  async createUser(@Body() createDTO: CreateUserDTO) {
    return this.userService.createUser(createDTO);
  }

  @Get("/:id")
  async getUser(@Param("id") id: string) {
    return this.userService.getUser(id);
  }

  @Get("/")
  async getUsers() {
    return this.userService.getUsers();
  }

  @Delete('/:id')
  async deleteUser(@Param("id") id: string) {
    return this.userService.deleteUser(id)
  }

  @Patch("/:id")
  async updateUser(@Param("id") id: string, @Body() updateDTO: UpdateUserDTO) {
    return this.userService.updateUser(id, updateDTO);
  }
}
