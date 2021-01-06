import { AccountEntity } from 'src/domains/entities/account.entity';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';
import { SendMoneyCommand } from 'src/domains/ports/in/send-money.command';
import { SendMoneyUseCase } from 'src/domains/ports/in/send-money.use-case';
import { UpdateAccountPort } from 'src/domains/ports/out/update-account.port';

export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountStatePort: UpdateAccountPort,
  ) {}

  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    const sourceAccount: AccountEntity = await this._loadAccountPort.loadAccount(
      command.sourceAccountId,
    );

    const targetAccount: AccountEntity = await this._loadAccountPort.loadAccount(
      command.targetAccountId,
    );

    // Can we send money
    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      return false;
    }

    // Can we get money
    if (!targetAccount.deposit(command.money, sourceAccount.id)) {
      return false;
    }

    this._updateAccountStatePort.updateActivities(sourceAccount);
    this._updateAccountStatePort.updateActivities(targetAccount);

    return true;
  }
}
