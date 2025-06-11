export const TransactionTypes = {
  VOTE: 'vote',
  ELECTION_CREATED: 'election_created',
  CANDIDATE_ADD: 'candidate_add',
} as const;

export type TransactionType =
  (typeof TransactionTypes)[keyof typeof TransactionTypes];

export const TransactionStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];
