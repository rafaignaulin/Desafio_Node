import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import transactionRouter from '../routes/transaction.routes';
interface RequestDTO{
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: RequestDTO): Transaction {

      const { total } = this.transactionsRepository.getBalance();
    if( type === 'outcome' && value > total){
      throw new Error('You do not have enough balance');
    }
      const transaction = this.transactionsRepository.create({
        title, value, type
      });
      return transaction;
    }
  }


export default CreateTransactionService;
