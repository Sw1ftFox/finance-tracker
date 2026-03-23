import { Transaction, TransactionSortType } from '../models/transaction.interface';

export function sortTransactionsByDate(
  transactions: Transaction[],
  type: Omit<TransactionSortType, 'По умолчанию'>
): Transaction[] {
  const sortedTransactions = [...transactions];
  if (type === 'По возрастанию (по дате)') {
    return sortedTransactions.sort((a, b) => a.date.localeCompare(b.date));
  } else {
    return sortedTransactions.sort((a, b) => b.date.localeCompare(a.date));
  }
}
