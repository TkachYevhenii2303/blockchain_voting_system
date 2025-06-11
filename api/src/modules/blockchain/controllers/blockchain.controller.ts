import { Controller, Post, Body, Query, Param, Get } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain.service';
import { CreateTransactionDto } from '../dto/transaction.dto';
import { VotingService } from '@/modules/voting/voting.service';
import { ApiBody, ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly votingService: VotingService,
  ) {}

  @Post('vote/:votingId')
  @ApiParam({ name: 'votingId', type: String })
  @ApiBody({ type: CreateTransactionDto })
  async vote(
    @Body() transactionDto: CreateTransactionDto,
    @Param('votingId') votingId: string,
  ) {
    return this.votingService.vote(
      votingId,
      transactionDto.candidateId,
      transactionDto.fromAddress,
      transactionDto.electionId,
    );
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions' })
  async getAllTransactions() {
    return this.blockchainService.getAllTransactions();
  }

  @Get('votes')
  @ApiOperation({ summary: 'Get all votes' })
  async getAllVotes() {
    return this.blockchainService.getAllVotes();
  }

  @Get('elections')
  @ApiOperation({ summary: 'Get all elections' })
  async getAllElections() {
    return this.blockchainService.getAllElections();
  }

  @Get('elections/:id')
  @ApiOperation({ summary: 'Get election by id' })
  async getElectionById(@Param('id') id: string) {
    return this.blockchainService.getElectionById(id);
  }

  @Get('candidates')
  @ApiOperation({ summary: 'Get all candidates' })
  async getAllCandidates() {
    return this.blockchainService.getAllCandidates();
  }

  @Get('candidates/:id')
  @ApiOperation({ summary: 'Get candidate by id' })
  async getCandidateById(@Param('id') id: string) {
    return this.blockchainService.getCandidateById(id);
  }
}
