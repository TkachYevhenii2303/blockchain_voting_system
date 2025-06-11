import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';
import { ethers } from 'ethers';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async generateWallet(): Promise<{ address: string; privateKey: string }> {
    try {
      const wallet = ethers.Wallet.createRandom();
      const createdWallet = this.walletRepository.create({
        address: wallet.address,
        publicKey: wallet.publicKey,
        balance: 0,
      });
      await this.walletRepository.save(createdWallet);
      return {
        address: createdWallet.address,
        privateKey: wallet.privateKey,
      };
    } catch (error) {
      this.logger.error(`Error creating wallet: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async getWalletByAddress(address: string) {
    if (!ethers.isAddress(address)) {
      throw new BadRequestException('This is not a valid wallet address!');
    }

    const wallet = await this.walletRepository.findOne({
      where: { address },
      withDeleted: true,
    });

    if (!wallet) {
      throw new NotFoundException('This wallet is not found!');
    }

    return wallet;
  }

  async getWalletById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Wallet ID is required');
      }

      const wallet = await this.walletRepository.findOne({
        where: { id },
        withDeleted: true,
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      return wallet;
    } catch (error) {
      this.logger.error(`Error getting wallet by id: ${error}`);
      throw new InternalServerErrorException('Failed to fetch wallet');
    }
  }

  async getWallets() {
    try {
      return await this.walletRepository.find({
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting all wallets: ${error}`);
      throw new InternalServerErrorException('Failed to fetch wallets');
    }
  }
}
