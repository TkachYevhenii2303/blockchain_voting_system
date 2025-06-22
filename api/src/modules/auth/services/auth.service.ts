import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtTokenService } from "./jwt-token.service";
import * as bcrypt from "bcrypt";
import { RefreshTokenRepository } from "../repositories/refresh-token.repository";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly userRepository: UserRepository
  ) {}

  async registerUser(dto: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save({
      ...dto,
      passwordHash: hashedPassword,
    });

    const refreshToken = this.jwtTokenService.generateRefreshToken({
      id: user.id,
      email: user.email,
    });
    await this.refreshTokenRepository.save({
      userId: user.id,
      token: refreshToken,
    });

    return {
      accessToken: this.jwtTokenService.generateAccessToken({
        id: user.id,
        email: user.email,
      }),
      refreshToken,
      userId: user.id,
    };
  }

  async loginUser(dto: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.credentials.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { id: user.id, email: user.email };
    const refreshToken = this.jwtTokenService.generateRefreshToken(payload);
    const existingToken = await this.refreshTokenRepository.findByUserId(
      user.id
    );

    if (existingToken) {
      await this.refreshTokenRepository.update(existingToken.id, {
        token: refreshToken,
      });
    } else {
      await this.refreshTokenRepository.save({
        userId: user.id,
        token: refreshToken,
      });
    }

    return {
      accessToken: this.jwtTokenService.generateAccessToken(payload),
      refreshToken,
      userId: user.id,
    };
  }

  async refreshToken(token: string) {
    const payload = this.jwtTokenService.verifyRefreshToken(token);

    const storedToken = await this.refreshTokenRepository.findByUserId(
      payload.id
    );
    if (!storedToken || storedToken.token !== token) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.userRepository.findById(payload.id);

    return {
      accessToken: this.jwtTokenService.generateAccessToken({
        id: user.id,
        email: user.email,
      }),
    };
  }
}
