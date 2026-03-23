import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';

@Component({
  standalone: true,
  imports: [
    TransactionFormComponent,
    TransactionHistoryComponent,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
})
export class AppComponent {}
