import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";
import { UserCreateInput, UserUpdateInput } from "generated/prisma/models";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createInput: UserCreateInput) {
    return this.prismaService.user.create({
      data: createInput,
      omit: {
        id: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async getUser(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id,
        is_deleted: false,
      },
      omit: {
        password: true,
        is_deleted: true,
      },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany({
      where: {
        is_deleted: false,
      },
      omit: {
        password: true,
        is_deleted: true,
      },
    });
  }

  async updateUser(id: string, updateInput: UserUpdateInput) {
    return this.prismaService.user.update({
      where: {
        id,
        is_deleted: false
      },
      data: updateInput,
      omit: {
        id: true,
        is_deleted: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async deleteUser(id: string) {
    return this.prismaService.user.update({
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
