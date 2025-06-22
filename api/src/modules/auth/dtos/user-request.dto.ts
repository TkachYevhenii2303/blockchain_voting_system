import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class UserRequestDto {
  @ApiProperty({
    description: "User's email address",
    example: "user@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User's username",
    example: "johndoe",
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;
  
  @ApiProperty({
    description: "User's username",
    example: "johndoe",
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: "User's password",
    example: "password123",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
