import { Election, VotingStats } from "@/types/blockchain.types";

export const mockElections: Election[] = [
  {
    id: "1",
    title: "Blockchain Governance Council Election 2024",
    description:
      "Election for the new Blockchain Governance Council members who will guide the future development and policies of our decentralized platform.",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-01-25T23:59:59Z",
    status: "active",
    totalVotes: 1247,
    voterCount: 987,
    rules: [
      "Each verified wallet can cast one vote",
      "Voting is anonymous and verifiable on blockchain",
      "Results are final and immutable",
      "Minimum 48 hours voting period",
    ],
    createdBy: "0x742d35Cc6634C0532925a3b8D40Ad4fC9B23745f",
    blockchainTxHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    candidates: [
      {
        id: "c1",
        name: "Alice Johnson",
        description:
          "Blockchain architect with 8+ years experience in DeFi and governance systems.",
        avatar: "/avatars/alice.jpg",
        party: "Progressive Tech",
        voteCount: 456,
        percentage: 36.6,
        policies: [
          "Increase transaction throughput",
          "Lower gas fees",
          "Enhanced security protocols",
        ],
        experience:
          "Former CTO at BlockTech, Lead Developer at Ethereum Foundation",
      },
      {
        id: "c2",
        name: "Bob Chen",
        description:
          "Experienced governance specialist focused on community-driven development.",
        avatar: "/avatars/bob.jpg",
        party: "Community First",
        voteCount: 387,
        percentage: 31.0,
        policies: [
          "Democratic voting mechanisms",
          "Community fund allocation",
          "Transparent governance",
        ],
        experience: "DAO Governance Expert, Former Regulatory Advisor",
      },
      {
        id: "c3",
        name: "Carol Martinez",
        description:
          "Security expert and privacy advocate with focus on user protection.",
        avatar: "/avatars/carol.jpg",
        party: "Security Alliance",
        voteCount: 298,
        percentage: 23.9,
        policies: [
          "Zero-knowledge privacy",
          "Advanced security audits",
          "User data protection",
        ],
        experience: "Cybersecurity Consultant, Former NSA Security Analyst",
      },
      {
        id: "c4",
        name: "David Kim",
        description:
          "Innovation leader promoting sustainable blockchain solutions.",
        avatar: "/avatars/david.jpg",
        party: "Green Tech",
        voteCount: 106,
        percentage: 8.5,
        policies: [
          "Carbon neutral blockchain",
          "Sustainable mining",
          "Green energy integration",
        ],
        experience: "Environmental Tech Researcher, Clean Energy Advocate",
      },
    ],
  },
  {
    id: "2",
    title: "Protocol Upgrade Referendum",
    description:
      "Community vote on the proposed protocol upgrade that will enhance transaction speed and reduce gas fees by 40%.",
    startDate: "2024-01-20T00:00:00Z",
    endDate: "2024-01-30T23:59:59Z",
    status: "active",
    totalVotes: 1089,
    voterCount: 876,
    rules: [
      "Minimum 1000 tokens required to vote",
      "Simple majority wins",
      "Proposal implemented automatically if passed",
    ],
    createdBy: "0x856f2B8D4A93E2C2F9D4E1A7B6C5D8E9F0A1B2C3",
    blockchainTxHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a",
    candidates: [
      {
        id: "p1",
        name: "Yes - Implement Upgrade",
        description:
          "Support the protocol upgrade with enhanced features and lower fees.",
        avatar: "/avatars/yes.jpg",
        party: "Progressive Development",
        voteCount: 645,
        percentage: 59.2,
        policies: [
          "40% gas fee reduction",
          "Enhanced security features",
          "Better scalability solutions",
          "Backward compatibility maintained",
        ],
        experience: "Backed by core development team and major validators",
      },
      {
        id: "p2",
        name: "No - Keep Current Protocol",
        description:
          "Maintain the current protocol without changes for stability.",
        avatar: "/avatars/no.jpg",
        party: "Conservative Stability",
        voteCount: 444,
        percentage: 40.8,
        policies: [
          "Stability focus approach",
          "Risk avoidance strategy",
          "Gradual improvements only",
          "Thorough testing period",
        ],
        experience: "Supported by long-term holders and security experts",
      },
    ],
  },
  {
    id: "3",
    title: "Community Treasury Fund Allocation",
    description:
      "Decide how to allocate the 50,000 ETH community treasury fund for the next quarter to maximize ecosystem growth.",
    startDate: "2024-01-22T00:00:00Z",
    endDate: "2024-02-01T23:59:59Z",
    status: "active",
    totalVotes: 1456,
    voterCount: 1234,
    rules: [
      "Multiple choice voting allowed",
      "Funds distributed based on percentage",
      "Quarterly allocation review",
      "Transparent fund usage reporting",
    ],
    createdBy: "0x123f2B8D4A93E2C2F9D4E1A7B6C5D8E9F0A1B2C3",
    blockchainTxHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b",
    candidates: [
      {
        id: "t1",
        name: "Development & Research",
        description:
          "Fund core development and research initiatives for platform advancement.",
        avatar: "/avatars/dev.jpg",
        party: "Innovation Focus",
        voteCount: 583,
        percentage: 40.0,
        policies: [
          "Core protocol development",
          "Research grants program",
          "Developer incentives",
          "Open source contributions",
        ],
        experience: "Led by senior developers with proven track record",
      },
      {
        id: "t2",
        name: "Marketing & Community",
        description:
          "Promote adoption and community growth through strategic marketing.",
        avatar: "/avatars/marketing.jpg",
        party: "Growth Strategy",
        voteCount: 437,
        percentage: 30.0,
        policies: [
          "Global marketing campaigns",
          "Community events funding",
          "Educational content creation",
          "Partnership development",
        ],
        experience: "Marketing professionals with blockchain expertise",
      },
      {
        id: "t3",
        name: "Security & Audits",
        description:
          "Enhance platform security through comprehensive audits and bug bounties.",
        avatar: "/avatars/security.jpg",
        party: "Security First",
        voteCount: 291,
        percentage: 20.0,
        policies: [
          "Regular security audits",
          "Bug bounty program expansion",
          "Penetration testing",
          "Security research funding",
        ],
        experience: "Top cybersecurity firms and white hat hackers",
      },
      {
        id: "t4",
        name: "Emergency Reserve",
        description:
          "Keep funds in reserve for emergency situations and unforeseen expenses.",
        avatar: "/avatars/reserve.jpg",
        party: "Risk Management",
        voteCount: 145,
        percentage: 10.0,
        policies: [
          "Emergency fund maintenance",
          "Risk management protocols",
          "Stability measures",
          "Crisis response capability",
        ],
        experience: "Risk management experts and financial advisors",
      },
    ],
  },
  {
    id: "4",
    title: "Community Treasury Fund Allocation Q1 2024",
    description:
      "Final results for Q1 2024 treasury fund allocation. Development & Research received the majority vote.",
    startDate: "2024-01-10T00:00:00Z",
    endDate: "2024-01-20T23:59:59Z",
    status: "ended",
    totalVotes: 2156,
    voterCount: 1789,
    rules: [
      "Single choice voting only",
      "Results implemented immediately",
      "Transparent fund distribution",
      "Quarterly performance review",
    ],
    createdBy: "0x456f2B8D4A93E2C2F9D4E1A7B6C5D8E9F0A1B2C3",
    blockchainTxHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c",
    candidates: [
      {
        id: "f1",
        name: "Mobile Wallet Integration",
        description:
          "Native mobile application with full wallet functionality and biometric security.",
        avatar: "/avatars/mobile.jpg",
        party: "Mobile First",
        voteCount: 864,
        percentage: 40.1,
        policies: [
          "iOS and Android native apps",
          "Biometric security integration",
          "Push notifications system",
          "Offline transaction capability",
        ],
        experience: "Mobile development team with 50+ published apps",
      },
      {
        id: "f2",
        name: "Cross-Chain Bridge",
        description:
          "Enable seamless asset transfers between different blockchain networks.",
        avatar: "/avatars/bridge.jpg",
        party: "Interoperability",
        voteCount: 647,
        percentage: 30.0,
        policies: [
          "Multi-chain support (ETH, BSC, Polygon)",
          "Automated bridging protocols",
          "Minimal transaction fees",
          "Security audit completed",
        ],
        experience: "Blockchain interoperability specialists",
      },
      {
        id: "f3",
        name: "Advanced Analytics Dashboard",
        description:
          "Comprehensive analytics and reporting tools for users and developers.",
        avatar: "/avatars/analytics.jpg",
        party: "Data Intelligence",
        voteCount: 431,
        percentage: 20.0,
        policies: [
          "Real-time data visualization",
          "Custom report generation",
          "Data export capabilities",
          "API access for developers",
        ],
        experience: "Data science team with blockchain analytics expertise",
      },
      {
        id: "f4",
        name: "DeFi Integration Suite",
        description:
          "Comprehensive DeFi tools integration for yield farming and liquidity provision.",
        avatar: "/avatars/defi.jpg",
        party: "DeFi Innovation",
        voteCount: 214,
        percentage: 9.9,
        policies: [
          "Yield farming optimization",
          "Liquidity mining rewards",
          "Automated portfolio rebalancing",
          "Risk assessment tools",
        ],
        experience: "DeFi protocol developers and yield optimization experts",
      },
    ],
  },
];

export const mockVotingStats: Record<string, VotingStats> = {
  "1": {
    totalVotes: 1247,
    participationRate: 73.2,
    leadingCandidate: "Alice Johnson",
    timeRemaining: 6 * 24 * 60 * 60 * 1000,
  },
  "2": {
    totalVotes: 1089,
    participationRate: 68.5,
    leadingCandidate: "Yes - Implement Upgrade",
    timeRemaining: 10 * 24 * 60 * 60 * 1000,
  },
  "3": {
    totalVotes: 1456,
    participationRate: 82.1,
    leadingCandidate: "Development & Research",
    timeRemaining: 8 * 24 * 60 * 60 * 1000,
  },
  "4": {
    totalVotes: 2156,
    participationRate: 89.5,
    leadingCandidate: "Mobile Wallet Integration",
  },
};

// Helper function to get election by ID
export const getElectionById = (id: string): Election | null => {
  return mockElections.find((election) => election.id === id) || null;
};

// Helper function to get voting stats by ID
export const getVotingStatsById = (id: string): VotingStats | null => {
  return mockVotingStats[id] || null;
};
