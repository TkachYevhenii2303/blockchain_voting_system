// ui/app/components/profile/profile-widget.tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/ui/button';
import { Card, CardContent, CardHeader } from '@/components/shadcn/ui/card';
import { Badge } from '@/components/shadcn/ui/badge';
import {
  User,
  Vote,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Copy,
  Check,
  TrendingUp,
  Shield,
  Zap,
  Calendar,
  Hash,
  ExternalLink,
  Settings,
  LogOut,
  Edit3,
  Award,
  Activity,
} from 'lucide-react';
import rhamster_front from '../../../public/characters/rhamster_front.png';
import rhamster_back from '../../../public/characters/rhamster_back.jpg';

interface VotingTransaction {
  id: string;
  type: 'vote' | 'delegate' | 'proposal';
  title: string;
  description: string;
  timestamp: string;
  blockNumber: number;
  txHash: string;
  status: 'confirmed' | 'pending' | 'failed';
  gasUsed: number;
  value?: string;
  votingPower: number;
}

interface ProfileData {
  id: string;
  username: string;
  walletAddress: string;
  joinDate: string;
  totalVotes: number;
  votingPower: number;
  reputation: number;
  level: number;
  achievements: string[];
  status: 'active' | 'inactive' | 'banned';
}

const mockProfileData: ProfileData = {
  id: '1',
  username: 'Blockchain Hamster',
  walletAddress: '0x742d35Cc6634C0532925a3b8D40Ad4fC9B23745f',
  joinDate: '2024-01-15',
  totalVotes: 47,
  votingPower: 1250,
  reputation: 8750,
  level: 12,
  achievements: ['Early Adopter', 'Democracy Champion', 'Trusted Validator'],
  status: 'active',
};

const mockTransactions: VotingTransaction[] = [
  {
    id: '1',
    type: 'vote',
    title: 'Blockchain Governance Update',
    description: 'Voted YES on proposal #BG-2024-001',
    timestamp: '2024-01-20T10:30:00Z',
    blockNumber: 2851047,
    txHash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    status: 'confirmed',
    gasUsed: 21000,
    votingPower: 500,
  },
  {
    id: '2',
    type: 'proposal',
    title: 'Community Fund Allocation',
    description: 'Created proposal for education initiative',
    timestamp: '2024-01-18T14:22:00Z',
    blockNumber: 2850892,
    txHash: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a',
    status: 'confirmed',
    gasUsed: 45000,
    votingPower: 750,
  },
  {
    id: '3',
    type: 'delegate',
    title: 'Delegate Voting Power',
    description: 'Delegated 250 voting power to @DemocracyExpert',
    timestamp: '2024-01-16T09:15:00Z',
    blockNumber: 2850654,
    txHash: '0x5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z',
    status: 'pending',
    gasUsed: 32000,
    votingPower: 250,
  },
  {
    id: '4',
    type: 'vote',
    title: 'Infrastructure Upgrade',
    description: 'Voted NO on proposal #IU-2024-003',
    timestamp: '2024-01-14T16:45:00Z',
    blockNumber: 2850321,
    txHash: '0x3c2b1a0z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d',
    status: 'failed',
    gasUsed: 18500,
    votingPower: 400,
  },
];

const getStatusColor = (status: VotingTransaction['status']) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTypeIcon = (type: VotingTransaction['type']) => {
  switch (type) {
    case 'vote':
      return <Vote className="h-4 w-4" />;
    case 'proposal':
      return <Edit3 className="h-4 w-4" />;
    case 'delegate':
      return <TrendingUp className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const ProfileWidget = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions'>(
    'overview'
  );
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [characterView, setCharacterView] = useState<'front' | 'back'>('front');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(mockProfileData.walletAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCharacterClick = () => {
    setCharacterView((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  return (
    <div className={cn('w-full h-full', className)}>
      <Card className="overflow-hidden border-none shadow-2xl border-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        {/* Header with Character */}
        <CardHeader className="relative h-64 p-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffb700] via-[#ffaa00] to-[#ffa200]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Character Image */}
          <div
            className="absolute left-8 top-8 group cursor-pointer"
            onClick={handleCharacterClick}>
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/30 shadow-2xl transform hover:scale-105 transition-all duration-300">
              <img
                src={
                  characterView === 'front'
                    ? rhamster_front.src
                    : rhamster_back.src
                }
                alt="Rhamster Character"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Eye className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-xs text-white/80">Click to rotate</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="absolute right-8 top-8 text-right text-white">
            <h1 className="text-3xl font-bold mb-2">
              {mockProfileData.username}
            </h1>
            <div className="flex items-center justify-end space-x-2 mb-4">
              <code className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                {formatAddress(mockProfileData.walletAddress)}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyAddress}
                className="text-white hover:bg-white/20 p-1">
                {copiedAddress ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Status Badge */}
            <Badge className="bg-green-500/20 text-green-100 border-green-400/30 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Active Voter
            </Badge>
          </div>

          {/* Stats Row */}
          <div className="absolute bottom-6 left-8 right-8 grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-white">
                {mockProfileData.totalVotes}
              </div>
              <div className="text-xs text-white/80">Total Votes</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-white">
                {mockProfileData.votingPower}
              </div>
              <div className="text-xs text-white/80">Voting Power</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-white">
                {mockProfileData.reputation}
              </div>
              <div className="text-xs text-white/80">Reputation</div>
            </div>
            <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="text-2xl font-bold text-white">
                Lv.{mockProfileData.level}
              </div>
              <div className="text-xs text-white/80">Level</div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Navigation Tabs */}
          <div className="flex space-x-2 mb-8 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className={cn(
                'flex-1 h-12 transition-all duration-300',
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#ffb700] to-[#ffa200] text-white shadow-lg'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              )}>
              <User className="h-5 w-5 mr-2" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'transactions' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('transactions')}
              className={cn(
                'flex-1 h-12 transition-all duration-300',
                activeTab === 'transactions'
                  ? 'bg-gradient-to-r from-[#ffb700] to-[#ffa200] text-white shadow-lg'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              )}>
              <Activity className="h-5 w-5 mr-2" />
              Transactions
            </Button>
          </div>

          {/* Content */}
          {activeTab === 'overview' ? (
            <div className="space-y-8">
              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                  <Award className="h-6 w-6 text-[#ffb700]" />
                  <span>Achievements</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mockProfileData.achievements.map((achievement, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="py-2 px-4 bg-gradient-to-r from-[#ffb700]/10 to-[#ffa200]/10 border-[#ffb700]/30">
                      <Shield className="h-4 w-4 mr-2 text-[#ffb700]" />
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Account Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Member Since
                      </span>
                      <span className="font-medium">
                        {new Date(
                          mockProfileData.joinDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Account Status
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network</span>
                      <span className="font-medium">Ethereum Mainnet</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Voting Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Proposals Created
                      </span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delegations</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Success Rate
                      </span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-16 flex-col space-y-2 hover:bg-[#ffb700]/10 hover:border-[#ffb700]/30">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Settings</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex-col space-y-2 hover:bg-blue-500/10 hover:border-blue-500/30">
                  <Edit3 className="h-6 w-6" />
                  <span className="text-sm">Edit Profile</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex-col space-y-2 hover:bg-purple-500/10 hover:border-purple-500/30">
                  <ExternalLink className="h-6 w-6" />
                  <span className="text-sm">Export Data</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-16 flex-col space-y-2 hover:bg-red-500/10 hover:border-red-500/30">
                  <LogOut className="h-6 w-6" />
                  <span className="text-sm">Sign Out</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Recent Transactions</h3>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {mockTransactions.length} transactions
                </Badge>
              </div>

              <div className="space-y-4">
                {mockTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="group p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ffb700] to-[#ffa200] flex items-center justify-center">
                          {getTypeIcon(tx.type)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg group-hover:text-[#ffb700] transition-colors">
                            {tx.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {tx.description}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={cn('border', getStatusColor(tx.status))}>
                        {tx.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(tx.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span>Block {tx.blockNumber.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                        <span>{tx.gasUsed.toLocaleString()} gas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span>{tx.votingPower} power</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {formatAddress(tx.txHash)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-[#ffb700]">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View on Explorer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Button
                  variant="outline"
                  className="hover:bg-[#ffb700]/10 hover:border-[#ffb700]/30">
                  Load More Transactions
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
