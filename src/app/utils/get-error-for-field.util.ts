import { FormGroup } from '@angular/forms';
import { TransactionKeys } from '../models/transaction.interface';

const errorMessages: Record<TransactionKeys, Record<string, string>> = {
  section: { required: 'Выберите тип транзакции' },
  category: { required: 'Выберите категорию' },
  sum: {
    required: 'Укажите сумму транзакции',
    min: 'Введите неотрицательное значение',
    max: 'Введенное значение слишком большое',
  },
  date: { required: 'Выберите дату' },
  comment: {
    required: 'Укажите комментарий к транзакции',
    maxlength: 'Комментарий слишком длинный!',
  },
};

export function getErrorForField(form: FormGroup, fieldName: TransactionKeys): null | string {
  const control = form.get(fieldName);
  if (!control || !control.invalid || (!control.touched && !control.dirty)) {
    return null;
  }

  const errors = control?.errors;
  if (errors) {
    const firstErrorKey = Object.keys(errors)[0];
    const fieldMessages = errorMessages[fieldName];
    return fieldMessages[firstErrorKey] || null;
  }

  return null;
}
