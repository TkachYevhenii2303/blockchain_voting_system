import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";


export class UserResponseDto {
  @ApiProperty({
    description: "User's unique identifier",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  email: string;

  @ApiProperty({
    description: "User's username",
    example: "johndoe",
    required: false,
  })
  username?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  static fromEntity(user: User): UserResponseDto {
    return new UserResponseDto({
      id: user.id,
      email: user.email,
      username: user.firstName + " " + user.lastName || "",
    });
  }
}

