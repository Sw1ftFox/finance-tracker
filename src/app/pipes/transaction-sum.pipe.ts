import { Transaction } from 'src/app/models/transaction.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionSum',
  standalone: true,
})
export class TransactionSumPipe implements PipeTransform {
  transform(transaction: Transaction): string {
    if (transaction.sum === 0) return `${transaction.sum} ₽`;

    const { transactionInteger, transactionDecimals } = this.splitTransactionSum(transaction.sum);

    const resultString = this.getResultString(transactionInteger, transactionDecimals);
    return transaction.section === 'Доходы' ? `+${resultString} ₽` : `-${resultString} ₽`;
  }

  private splitTransactionSum(sum: number): {
    transactionInteger: string;
    transactionDecimals: string;
  } {
    const isDecimal = String(sum).indexOf('.') === -1 ? false : true;
    let transactionInteger = '';
    let transactionDecimals = '';
    if (!isDecimal) {
      transactionInteger = String(sum).slice(0);
    } else {
      const indexOfPoint = String(sum).indexOf('.');
      transactionInteger = String(sum).slice(0, indexOfPoint);
      transactionDecimals = ',' + String(sum).slice(indexOfPoint + 1);
    }
    return {
      transactionInteger,
      transactionDecimals,
    };
  }

  private getResultString(transactionInteger: string, transactionDecimals: string): string {
    const stringArr = transactionInteger.split('').reverse();
    const resultArr: string[] = [];
    for (let i = 0; i < stringArr.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        resultArr.push(' ');
      }
      resultArr.push(stringArr[i]);
    }
    return resultArr.reverse().join('') + transactionDecimals;
  }
}
