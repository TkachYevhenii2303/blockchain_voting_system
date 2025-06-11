import { Controller, Post, Get, Param } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  async getWallets() {
    return this.walletService.getWallets();
  }

  @Get(':address')
  @ApiOperation({ summary: 'Get a wallet by address' })
  async getWalletByAddress(@Param('address') address: string) {
    return this.walletService.getWalletByAddress(address);
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get a wallet by id' })
  async getWalletById(@Param('id') id: string) {
    return this.walletService.getWalletById(id);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a ethereum wallet' })
  async generateWallet() {
    return this.walletService.generateWallet();
  }
}
