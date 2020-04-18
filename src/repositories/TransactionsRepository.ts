import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let sumValuesTypeIncome = 0;
    let sumValuesTypeOutcome = 0;
    let total = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        sumValuesTypeIncome += transaction.value;
      } else {
        sumValuesTypeOutcome += transaction.value;
      }
    });

    total = sumValuesTypeIncome - sumValuesTypeOutcome;

    const balance = {
      income: sumValuesTypeIncome,
      outcome: sumValuesTypeOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
