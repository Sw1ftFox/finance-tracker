import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewTransaction, Transaction } from 'src/app/models/transaction.interface';
import { StorageManager } from 'src/app/utils/storage-manager.util';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactions: Transaction[] = [];
  private transactionsSubject$ = new BehaviorSubject<Transaction[]>(this.transactions);

  constructor() {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    const stored = StorageManager.getItem('transactions');
    this.transactions = stored ? stored : [];
    this.transactionsSubject$.next([...this.transactions]);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject$.asObservable();
  }

  addTransaction(transaction: NewTransaction): void {
    const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    this.transactions.push({ ...transaction, id });
    StorageManager.setItem('transactions', this.transactions);
    this.transactionsSubject$.next([...this.transactions]);
  }

  removeTransaction(transactionId: string) {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== transactionId);
    StorageManager.setItem('transactions', this.transactions);
    this.transactionsSubject$.next([...this.transactions]);
  }
}
