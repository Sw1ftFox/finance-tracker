import { Directive, Input, OnDestroy, OnInit, Self } from '@angular/core';
import { FormControl, NgControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appTransactionCommentValidator]',
  standalone: true,
})
export class TransactionCommentValidatorDirective implements OnInit, OnDestroy {
  @Input('appTransactionCommentValidator') targetControl!: FormControl;
  private readonly destroy$ = new Subject<void>();

  constructor(@Self() private checkboxControl: NgControl) {}

  ngOnInit() {
    this.checkboxControl.valueChanges?.pipe(takeUntil(this.destroy$)).subscribe((allowComment) => {
      this.updateValidation(allowComment);
    });
  }

  private updateValidation(allowComment: boolean) {
    if (!this.targetControl) return;

    if (allowComment) {
      this.targetControl.setValidators([Validators.maxLength(100), Validators.required]);
    } else {
      this.targetControl.clearValidators();
      this.targetControl.reset();
    }

    this.targetControl.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
