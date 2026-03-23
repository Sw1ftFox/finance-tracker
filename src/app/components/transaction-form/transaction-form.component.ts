import { TransactionFacadeService } from './../../services/transaction-facade/transaction-facade.service';
import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiDay } from '@taiga-ui/cdk';
import { NewTransaction } from 'src/app/models/transaction.interface';
import { TransactionSectionComponent } from '../transaction-section/transaction-section.component';
import { TransactionCategoryComponent } from '../transaction-category/transaction-category.component';
import { TransactionSumComponent } from '../transaction-sum/transaction-sum.component';
import { TransactionDateComponent } from '../transaction-date/transaction-date.component';
import { TransactionCheckboxComponent } from '../transaction-checkbox/transaction-checkbox.component';
import { TransactionTextareaComponent } from '../transaction-textarea/transaction-textarea.component';
import { getToday } from 'src/app/utils/date.util';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { getErrorForField } from 'src/app/utils/get-error-for-field.util';
import { TransactionNotificationComponent } from '../transaction-notification/transaction-notification.component';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionSectionComponent,
    TransactionCategoryComponent,
    TransactionSumComponent,
    TransactionDateComponent,
    TransactionCheckboxComponent,
    TransactionTextareaComponent,
    TuiButtonModule,
    TuiErrorModule,
    TransactionNotificationComponent,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent implements OnDestroy {
  readonly transactionFacadeService = inject(TransactionFacadeService);
  private readonly transactionService = inject(TransactionService);
  readonly getErrorForField = getErrorForField;
  readonly isSuccess$ = new BehaviorSubject<boolean>(false);
  private readonly destroy$ = new Subject<void>();
  readonly loading$ = new BehaviorSubject<boolean>(false);

  readonly form = new FormGroup({
    section: new FormControl<'Доходы' | 'Расходы' | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sum: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0), Validators.max(10_000_000)],
    }),
    date: new FormControl<TuiDay>(getToday(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    allowComment: new FormControl<boolean | null>(false),
    comment: new FormControl<string>('', { nonNullable: true }),
  });

  readonly sectionSubject$ = this.form.controls.section.valueChanges;

  submit() {
    if (this.form.valid) {
      this.form.disable();
      this.loading$.next(true);
      const rawValue = this.form.getRawValue();
      const transactionValue: NewTransaction = {
        section: rawValue.section,
        category: rawValue.category,
        sum: rawValue.sum,
        date: this.convertTuiDayToISO(rawValue.date),
        comment: rawValue.allowComment ? rawValue.comment : '',
      };
      this.transactionFacadeService
        .create(transactionValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.loading$.next(false);
          this.transactionService.addTransaction(data);
          this.form.reset();
          this.form.enable();
          this.isSuccess$.next(true);
          setTimeout(() => {
            this.isSuccess$.next(false);
          }, 3000);
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private convertTuiDayToISO(tuiDay: TuiDay): string {
    return `${tuiDay.year}-${tuiDay.month + 1}-${tuiDay.day >= 10 ? tuiDay.day : `0${tuiDay.day}`}`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
