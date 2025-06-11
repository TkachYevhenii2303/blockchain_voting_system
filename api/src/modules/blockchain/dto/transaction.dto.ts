import { TransactionType } from '@/common/types/transaction-types.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ description: 'From address', example: '0x1234567890abcdef' })
  @IsNotEmpty({ message: 'From address is required' })
  @IsString({ message: 'From address must be a string' })
  fromAddress: string;

  @ApiProperty({ description: 'Candidate ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty({ message: 'Voting ID is required' })
  @IsString({ message: 'Voting ID must be a string' })
  candidateId: string;

  @ApiProperty({ description: 'Election ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty({ message: 'Election ID is required' })
  @IsString({ message: 'Election ID must be a string' })
  electionId: string;
}

export class TransactionResponseDto {}
