import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === 'income') {
      const income = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return income;
    }

    const balance = this.transactionsRepository.getBalance();

    if (value > balance.total) {
      throw new Error('You do not have this amount on account');
    }

    const outcome = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return outcome;
  }
}

export default CreateTransactionService;
