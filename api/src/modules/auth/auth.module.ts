import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Credentials } from './entities/credentials.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UserSession } from './entities/user-session.entity';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { JwtTokenService } from './services/jwt-token.service';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credentials, RefreshToken, UserSession]),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService, JwtTokenService, UserRepository, RefreshTokenRepository],
  exports: [AuthService, UserService, JwtTokenService, UserRepository, RefreshTokenRepository],
})
export class AuthModule {}
