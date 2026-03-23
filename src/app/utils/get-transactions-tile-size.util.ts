import { Transaction } from '../models/transaction.interface';

export interface TransactionTileSize {
  w: number;
  h: number;
}

const MAX_WIDTH = 3;

export function getTransactionsTileSize(
  transactions: Transaction[]
): Map<string, TransactionTileSize> {
  if (!transactions) return new Map();
  const sumArr = transactions.map((transaction) => transaction.sum);
  const maxSum = Math.max(...sumArr);
  const sizes = new Map();
  transactions.forEach((transaction) => {
    sizes.set(transaction.id, {
      w: Math.min(
        MAX_WIDTH,
        transaction.sum === 0
          ? 1
          : transaction.sum === maxSum
          ? 10
          : Math.ceil((transaction.sum / maxSum) * 10)
      ),
      h: 1,
    });
  });
  return sizes;
}
