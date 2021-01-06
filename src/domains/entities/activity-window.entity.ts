import { ActivityEntity } from 'src/domains/entities/activity.entity';
import { AccountId } from 'src/domains/entities/account.entity';
import { MoneyEntity } from 'src/domains/entities/money.entity';

export class ActivityWindowEntity {
  private readonly _activities: ActivityEntity[];

  get activities(): ActivityEntity[] {
    return this._activities;
  }

  addActivity(activity: ActivityEntity) {
    this.activities.push(activity);

    return this;
  }

  public calculateBalance(accountId: AccountId): MoneyEntity {
    const depositeBalance = this.activities
      .filter((activity) => activity.targetAccountId === accountId)
      .map((activity) => activity.money)
      .reduce(MoneyEntity.add, MoneyEntity.ZERO());

    const withdrawalBalance = this.activities
      .filter((activity) => activity.sourceAccountId === accountId)
      .map((activity) => activity.money)
      .reduce(MoneyEntity.add, MoneyEntity.ZERO());

    return MoneyEntity.add(depositeBalance, withdrawalBalance.negate());
  }
}
