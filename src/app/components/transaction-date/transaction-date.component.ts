import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDay } from '@taiga-ui/cdk';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiInputDateModule } from '@taiga-ui/kit';
import { getToday } from 'src/app/utils/date.util';

@Component({
  selector: 'app-transaction-date',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TuiInputDateModule],
  templateUrl: './transaction-date.component.html',
  styleUrl: './transaction-date.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDateComponent {
  @Input() control!: FormControl<TuiDay | null>;

  readonly today = getToday();
}
