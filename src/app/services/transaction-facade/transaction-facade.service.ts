import { NewTransaction } from './../../models/transaction.interface';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionFacadeService {
  private readonly apiService = inject(ApiService);

  create(transaction: NewTransaction): Observable<NewTransaction> {
    return this.apiService.create(transaction);
  }
}
