import { AccountEntity, AccountId } from 'src/domains/entities/account.entity';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId): Promise<AccountEntity>;
}
