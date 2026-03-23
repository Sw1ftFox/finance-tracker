export type TransactionSortType =
  | 'По умолчанию'
  | 'По убыванию (по дате)'
  | 'По возрастанию (по дате)';

export interface Transaction {
  id: string;
  section: 'Доходы' | 'Расходы' | null;
  category: string | null;
  sum: number;
  date: string;
  comment?: string;
}

export type NewTransaction = Omit<Transaction, 'id'>;

export type TransactionKeys = keyof NewTransaction;
