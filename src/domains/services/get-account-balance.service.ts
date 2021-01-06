import { GetAccountBalanceQuery } from 'src/domains/ports/in/get-account-balance.query';
import { AccountId } from 'src/domains/entities/account.entity';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly _loadAccountPort: LoadAccountPort) {}

  getAccountBalance(accountId: AccountId) {
    return this._loadAccountPort.loadAccount(accountId).calculateBalance();
  }
}
