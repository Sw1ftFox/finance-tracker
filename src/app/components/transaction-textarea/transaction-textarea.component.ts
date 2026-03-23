import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiTextareaModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-transaction-textarea',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TuiTextareaModule],
  templateUrl: './transaction-textarea.component.html',
  styleUrl: './transaction-textarea.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionTextareaComponent {
  @Input() control!: FormControl<string>;
  @Input() isEnabled!: boolean | null;
}
