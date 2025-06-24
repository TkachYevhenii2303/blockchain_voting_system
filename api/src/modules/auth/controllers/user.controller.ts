import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  ConflictException,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserService } from "../services/user.service";
import { UserRequestDto } from "../dtos/user-request.dto";
import { UserResponseDto } from "../dtos/user-response.dto";

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "Returns all users",
    type: [UserResponseDto],
  })
  async getAllUsers() {
    const users = await this.userService.getAllUsers();
    return {
      data: users,
      statusCode: 200,
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({
    status: 200,
    description: "Returns the user",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  async getUserById(@Param("id") id: string) {
    try {
      const user = await this.userService.getUserById(id);
      return {
        data: user,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException("User not found");
    }
  }

  @Put(":id")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @ApiResponse({
    status: 409,
    description: "Email already in use",
  })
  async updateUser(@Param("id") id: string, @Body() userDto: UserRequestDto) {
    try {
      const updatedUser = await this.userService.updateUser(id, userDto);
      return {
        data: updatedUser,
        statusCode: 200,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new NotFoundException("User not found");
    }
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({
    status: 204,
    description: "User deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param("id") id: string) {
    try {
      await this.userService.deleteUser(id);
      return {
        message: "User deleted successfully",
        statusCode: 204,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException("User not found");
    }
  }
}
