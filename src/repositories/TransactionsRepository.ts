import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  title: string;
  type: 'income' | 'outcome';
  value: number;
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
    // TODO
  }

 public getBalance() : Balance {

    const { income, outcome}= this.transactions.reduce((soma : Balance , transaction : Transaction) => {

      switch (transaction.type){

        case 'income' :
          soma.income += transaction.value;
        break;
        case 'outcome' :
          soma.outcome += transaction.value;
        break;
        default:
          break;

        }
        return soma;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    })
    const total = income - outcome;
    return {income, outcome, total};
  }

  public create({title , type , value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value})

    this.transactions.push(transaction);
    return transaction;
    // TODO
  }
}

export default TransactionsRepository;
