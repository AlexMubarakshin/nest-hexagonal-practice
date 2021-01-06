import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { AccountWebModule } from 'src/modules/account-web/account-web.module';
import { AccountPersistenceModule } from 'src/modules/account-persistense/account-persistence.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'data', 'data.sqlite'),
      logging: true,
      autoLoadEntities: true,
    }),
    AccountPersistenceModule,
    AccountWebModule,
  ],
})
export class AppModule {}
