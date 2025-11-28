import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO, UpdateUserDTO } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createDTO: CreateUserDTO) {
    return this.prismaService.user.create({
      data: createDTO,
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

  async updateUser(id: string, updateDTO: UpdateUserDTO) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: updateDTO,
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
      },
      data: {
        is_deleted: true,
      },
    });
  }
}
