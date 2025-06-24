import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserRequestDto } from "../dtos/user-request.dto";
import { UserResponseDto } from "../dtos/user-response.dto";
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAllUsers();
    return users.map((user) => UserResponseDto.fromEntity(user));
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return UserResponseDto.fromEntity(user);
  }

  async updateUser(
    id: string,
    userDto: UserRequestDto
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (userDto.email !== user.email) {
      try {
        await this.userRepository.findByEmail(userDto.email);
        throw new ConflictException("Email already in use");
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          throw error;
        }
      }
    }

    user.email = userDto.email;

    if (userDto.password) {
      user.credentials.password = await bcrypt.hash(userDto.password, 10);
    }

    const updatedUser = await this.userRepository.save(user);
    return UserResponseDto.fromEntity(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    await this.userRepository.remove(user);
  }
}
