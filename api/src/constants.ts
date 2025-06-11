export const blockchainConfig = {
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.BLOCKCHAIN_RPC_URL,
  contractAddress: process.env.CONTRACT_ADDRESS,
  contractAbi: JSON.parse(process.env.CONTRACT_ABI || '[]'),
};
