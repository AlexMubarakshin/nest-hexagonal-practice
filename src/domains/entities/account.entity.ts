import { MoneyEntity } from 'src/domains/entities/money.entity';
import { ActivityWindowEntity } from 'src/domains/entities/activity-window.entity';
import { ActivityEntity } from 'src/domains/entities/activity.entity';

export type AccountId = string;

export class AccountEntity {
  constructor(
    private readonly _id: AccountId,
    private readonly _baseLineBalance: MoneyEntity,
    private readonly _activityWindow: ActivityWindowEntity,
  ) {}

  get id(): AccountId {
    return this._id;
  }

  get baseLineBalance(): MoneyEntity {
    return this._baseLineBalance;
  }

  get activityWindow(): ActivityWindowEntity {
    return this._activityWindow;
  }

  public calculateBalance(): MoneyEntity {
    return MoneyEntity.add(
      this.baseLineBalance,
      this.activityWindow.calculateBalance(this.id),
    );
  }

  public withdraw(money: MoneyEntity, targetAccountId: AccountId): boolean {
    if (!this._mayWithdrawMoney(money)) {
      return false;
    }

    const withdrawal: ActivityEntity = new ActivityEntity(
      this.id,
      this.id,
      targetAccountId,
      new Date(),
      money,
    );

    this.activityWindow.addActivity(withdrawal);

    return true;
  }

  public deposit(money: MoneyEntity, sourceAccountId: AccountId): boolean {
    // TODO: Add check

    const deposit: ActivityEntity = new ActivityEntity(
      this.id,
      sourceAccountId,
      this.id,
      new Date(),
      money,
    );

    this.activityWindow.addActivity(deposit);

    return true;
  }

  private _mayWithdrawMoney(money: MoneyEntity) {
    return MoneyEntity.add(
      this.calculateBalance(),
      money.negate(),
    ).isPositiveOrZero();
  }
}
