import { AccountEntity } from 'src/domains/entities/account.entity';

export interface UpdateAccountPort {
  updateActivities(accountId: AccountEntity);
}
