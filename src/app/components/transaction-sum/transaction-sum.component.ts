import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiInputNumberModule } from '@taiga-ui/kit';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiCurrencyPipeModule } from '@taiga-ui/addon-commerce';

@Component({
  selector: 'app-transaction-sum',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TuiInputNumberModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiCurrencyPipeModule,
  ],
  templateUrl: './transaction-sum.component.html',
  styleUrl: './transaction-sum.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionSumComponent {
  @Input() control!: FormControl<number>;
}
