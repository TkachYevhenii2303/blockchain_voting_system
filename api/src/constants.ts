export const blockchainConfig = {
  privateKey: process.env.PRIVATE_KEY,
  rpcUrl: process.env.BLOCKCHAIN_RPC_URL,
  contractAddress: process.env.CONTRACT_ADDRESS,
  contractAbi: JSON.parse(process.env.CONTRACT_ABI || '[]'),
};

export const constants = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
};
