import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { constants } from "../../../constants";

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: constants.JWT_ACCESS_SECRET,
      expiresIn: constants.JWT_ACCESS_EXPIRES_IN,
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: constants.JWT_REFRESH_SECRET,
      expiresIn: constants.JWT_REFRESH_EXPIRES_IN,
    });
  }

  verifyAccessToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: constants.JWT_ACCESS_SECRET,
    });
  }

  verifyRefreshToken(token: string): any {
    return this.jwtService.verify(token, {
      secret: constants.JWT_REFRESH_SECRET,
    });
  }
}
