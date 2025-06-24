import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "../services/auth.service";
import { AuthResponseDto } from "../dtos/auth-response.dto";
import { RegisterRequestDto, LoginRequestDto, RefreshTokenRequestDto } from "../dtos/auth-request.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    type: AuthResponseDto,
  })
  async register(@Body() registerDto: RegisterRequestDto) {
    const authData = await this.authService.registerUser(registerDto);
    return {
      data: authData,
      statusCode: 201,
    };
  }

  @Post("login")
  @ApiOperation({ summary: "Login a user" })
  @ApiResponse({
    status: 200,
    description: "User successfully logged in",
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  async login(@Body() loginDto: LoginRequestDto) {
    try {
      const authData = await this.authService.loginUser(loginDto);
      return {
        data: authData,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("Login failed");
    }
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({
    status: 200,
    description: "Token successfully refreshed",
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid refresh token",
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenRequestDto) {
    try {
      const authData = await this.authService.refreshToken(
        refreshTokenDto.refreshToken
      );
      return {
        data: authData,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("Token refresh failed");
    }
  }
}
