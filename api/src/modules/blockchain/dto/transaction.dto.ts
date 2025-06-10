import { TransactionType } from '@/common/types/transaction-types.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'From address is required' })
  @IsString({ message: 'From address must be a string' })
  fromAddress: string;

  @IsNotEmpty({ message: 'To address is required' })
  @IsString({ message: 'To address must be a string' })
  toAddress: string;

  @IsNotEmpty({ message: 'Data is required' })
  @IsString({ message: 'Data must be a string' })
  data: string;

  @IsNotEmpty({ message: 'Transaction type is required' })
  @IsString({ message: 'Transaction type must be a string' })
  transactionType: TransactionType;
}

export class TransactionResponseDto {}
