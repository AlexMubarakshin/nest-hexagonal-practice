import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SendMoneyService } from 'src/domains/services/send-money.service';
import { SendMoneyUseCaseSymbol } from 'src/domains/ports/in/send-money.use-case';

import { AccountOrmEntity } from 'src/modules/account-persistense/account.orm-entity';
import { AccountPersistenceAdapter } from 'src/modules/account-persistense/account-persistence.adapter';
import { ActivityOrmEntity } from 'src/modules/account-persistense/activity.orm-entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,

      useFactory: (accountPersistenceAdapter: AccountPersistenceAdapter) => {
        return new SendMoneyService(
          accountPersistenceAdapter,
          accountPersistenceAdapter,
        );
      },

      inject: [AccountPersistenceAdapter],
    },
  ],

  exports: [SendMoneyUseCaseSymbol],
})
export class AccountPersistenceModule {}
