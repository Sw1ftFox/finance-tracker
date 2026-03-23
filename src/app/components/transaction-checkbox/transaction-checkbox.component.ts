import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiCheckboxBlockModule } from '@taiga-ui/kit';
import { TransactionCommentValidatorDirective } from 'src/app/directives/transaction-comment-validator/transaction-comment-validator.directive';

@Component({
  selector: 'app-transaction-checkbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TuiCheckboxBlockModule,
    TransactionCommentValidatorDirective,
  ],
  templateUrl: './transaction-checkbox.component.html',
  styleUrl: './transaction-checkbox.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionCheckboxComponent {
  @Input() control!: FormControl<boolean | null>;
  @Input() targetControl!: FormControl<string>;
}
