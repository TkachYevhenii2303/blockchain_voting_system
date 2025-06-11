import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  publicKey: string;

  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateWalletDto {
  @IsOptional()
  @IsNumber()
  balance?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class WalletResponseDto {
  id: string;
  address: string;
  publicKey: string;
  balance: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
