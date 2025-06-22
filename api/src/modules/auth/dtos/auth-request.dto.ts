import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RefreshTokenRequestDto {
  @ApiProperty({
    description: "Refresh token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class LoginRequestDto {
    @ApiProperty({
      description: "User's email address",
      example: "user@example.com",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({
      description: "User's password",
      example: "password123",
    })
    @IsString()
    @IsNotEmpty()
    password: string;
  }

  export class RegisterRequestDto {
    @ApiProperty({
      description: "User's email address",
      example: "user@example.com",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({
      description: "User's password",
      example: "password123",
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;


    @ApiProperty({
      description: "User's username",
      example: "johndoe",
    })
    @IsString()
    @IsNotEmpty()
    username: string;
  }