import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VotingService } from '../voting.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Voting')
@Controller('voting')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all votings' })
  async getAllVotings() {
    return this.votingService.getAllVotings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get voting by id' })
  async getVotingById(@Param('id') id: string) {
    return this.votingService.getVotingById(id);
  }

  @Get(':id/votes')
  @ApiOperation({ summary: 'Get all votes for a voting' })
  async getVotesByVotingId(@Param('id') id: string) {
    return this.votingService.getVotesByVotingId(id);
  }

  @Get('user/:walletAddress')
  @ApiOperation({ summary: 'Get user votes by wallet address' })
  async getUserVotes(@Param('walletAddress') walletAddress: string) {
    return this.votingService.getUserVotes(walletAddress);
  }
}
