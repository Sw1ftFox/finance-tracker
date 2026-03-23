import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiRadioBlockModule } from '@taiga-ui/kit';
import { TuiErrorModule, TuiGroupModule } from '@taiga-ui/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-section',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TuiGroupModule, TuiRadioBlockModule, TuiErrorModule],
  templateUrl: './transaction-section.component.html',
  styleUrl: './transaction-section.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionSectionComponent {
  @Input() control!: FormControl<'Доходы' | 'Расходы' | null>;

  readonly sections: string[] = ['Доходы', 'Расходы'];
}
