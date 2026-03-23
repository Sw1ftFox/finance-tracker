import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Transaction, TransactionSortType } from 'src/app/models/transaction.interface';
import { TuiDataListWrapperModule, TuiSelectModule, TuiTilesModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiTooltipModule } from '@taiga-ui/core';
import {
  getTransactionsTileSize,
  TransactionTileSize,
} from 'src/app/utils/get-transactions-tile-size.util';
import { Subject, takeUntil } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { sortTransactionsByDate } from 'src/app/utils/sort-transactions-by-date.util';
import { TransactionSumPipe } from 'src/app/pipes/transaction-sum.pipe';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TuiTilesModule,
    TuiSvgModule,
    TuiTooltipModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    DatePipe,
    TransactionSumPipe,
  ],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionHistoryComponent implements OnInit, OnDestroy {
  private readonly transactionService = inject(TransactionService);
  private defaultTransactions: Transaction[] = [];
  transactions: Transaction[] = [];
  transactionsTileSizes: Map<string, TransactionTileSize> = new Map();
  readonly sortingTransactions = new FormControl<TransactionSortType>('По умолчанию');
  private readonly destroy$ = new Subject<void>();
  order: Map<number, number> = new Map();
  readonly sortTypes = ['По умолчанию', 'По убыванию (по дате)', 'По возрастанию (по дате)'];

  getSumClass(transaction: Transaction): string {
    if (transaction.sum === 0) return '';
    if (transaction.section === 'Доходы') {
      return 'income';
    } else {
      return 'expenses';
    }
  }

  onDelete(transactionId: string) {
    this.transactionService.removeTransaction(transactionId);
  }

  ngOnInit() {
    this.transactionService
      .getTransactions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((transactions) => {
        this.defaultTransactions = [...transactions];
        this.transactions = [...transactions];
        this.transactionsTileSizes = getTransactionsTileSize(this.transactions);

        this.order = new Map(transactions.map((_, index) => [index, index]));
        this.applySorting('По умолчанию');
      });

    this.sortingTransactions.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((sortType) => {
      this.applySorting(sortType || '');
    });
  }

  private applySorting(sortType: string) {
    let sorted: Transaction[];
    if (sortType !== 'По умолчанию') {
      sorted = sortTransactionsByDate(this.transactions, sortType);
    } else {
      sorted = [...this.defaultTransactions];
    }
    this.transactions = sorted;
    this.order = new Map(sorted.map((_, newIndex) => [newIndex, newIndex]));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
