import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewTransaction } from 'src/app/models/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';

  create(transaction: NewTransaction): Observable<NewTransaction> {
    const tempNewTransaction = new BehaviorSubject<NewTransaction>(transaction);
    return tempNewTransaction;
    return this.http.post<NewTransaction>(this.url, transaction);
  }
}
