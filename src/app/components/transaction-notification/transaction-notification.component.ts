import { ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiNotificationModule } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transaction-notification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TuiNotificationModule],
  templateUrl: './transaction-notification.component.html',
  styleUrl: './transaction-notification.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionNotificationComponent {
  @Input() isSuccess!: BehaviorSubject<boolean>;

  onClose() {
    this.isSuccess.next(false);
  }
}
