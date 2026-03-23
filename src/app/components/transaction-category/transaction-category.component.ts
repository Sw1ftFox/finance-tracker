import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-transaction-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TuiSelectModule, TuiDataListWrapperModule],
  templateUrl: './transaction-category.component.html',
  styleUrl: './transaction-category.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionCategoryComponent implements OnInit, OnDestroy {
  @Input() control!: FormControl<string | null>;
  private readonly destroy$ = new Subject<void>();

  readonly incomeCategories: string[] = [
    'Зарплата',
    'Подработка',
    'Инвестиции',
    'Подарки',
    'Другое',
  ];

  readonly expensesCategories: string[] = [
    'Еда и продукты',
    'Транспорт',
    'Развлечения',
    'Коммунальные услуги',
    'Покупки',
    'Другое',
  ];

  @Input({ required: true }) sectionSubject$!: Observable<'Доходы' | 'Расходы' | null>;

  categoriesList: string[] = [];
  private prevSectionValue: 'Доходы' | 'Расходы' | null = null;

  ngOnInit() {
    this.sectionSubject$.pipe(takeUntil(this.destroy$)).subscribe((sectionValue) => {
      if (this.prevSectionValue !== sectionValue) {
        this.control.reset();
      }
      if (sectionValue) {
        this.prevSectionValue = sectionValue;
        this.categoriesList =
          sectionValue === 'Доходы' ? this.incomeCategories : this.expensesCategories;
      } else {
        this.categoriesList = [];
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
