import { AccountId } from 'src/domains/entities/account.entity';
import { MoneyEntity } from 'src/domains/entities/money.entity';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): MoneyEntity;
}
