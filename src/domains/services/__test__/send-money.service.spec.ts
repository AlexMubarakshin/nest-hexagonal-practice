import { mock, when, anything, anyString, instance } from 'ts-mockito';

import { AccountEntity, AccountId } from 'src/domains/entities/account.entity';
import { LoadAccountPort } from 'src/domains/ports/out/load-account.port';
import { MoneyEntity } from 'src/domains/entities/money.entity';
import { SendMoneyCommand } from 'src/domains/ports/in/send-money.command';
import { SendMoneyService } from 'src/domains/services/send-money.service';
import { UpdateAccountPort } from 'src/domains/ports/out/update-account.port';

describe('SendMoneyService', () => {
  it('It should transaction success', () => {
    const loadAccountPort = mock<LoadAccountPort>();
    const updateAccountPort = mock<UpdateAccountPort>();

    function givenAnAccountWithId(id: AccountId) {
      const mockedAccountEntity = mock(AccountEntity);

      when(mockedAccountEntity.id).thenReturn(id);

      when(mockedAccountEntity.withdraw(anything(), anyString())).thenReturn(
        true,
      );

      when(mockedAccountEntity.deposit(anything(), anyString())).thenReturn(
        true,
      );

      const account = instance(mockedAccountEntity);
      when(loadAccountPort.loadAccount(id)).thenReturn(
        Promise.resolve(account),
      );

      return account;
    }

    const sourceAccount = givenAnAccountWithId('42');
    const targetAccount = givenAnAccountWithId('69');

    const command = new SendMoneyCommand(
      sourceAccount.id,
      targetAccount.id,
      MoneyEntity.of(300),
    );

    const sendMoneyService = new SendMoneyService(
      instance(loadAccountPort),
      instance(updateAccountPort),
    );

    const result = sendMoneyService.sendMoney(command);

    expect(result).toBeTruthy();
  });
});
