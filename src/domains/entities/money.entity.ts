import { BigNumber } from 'bignumber.js';

export class MoneyEntity {
  constructor(private readonly _amount: BigNumber) {}

  static ZERO() {
    return new MoneyEntity(new BigNumber(0));
  }

  static of(value: number) {
    return new MoneyEntity(new BigNumber(value));
  }

  static add(a: MoneyEntity, b: MoneyEntity): MoneyEntity {
    return new MoneyEntity(a.amount.plus(b.amount));
  }

  get amount(): BigNumber {
    return this._amount;
  }

  public negate() {
    return new MoneyEntity(this.amount.negated());
  }

  public isPositiveOrZero(): boolean {
    return this.amount.comparedTo(0) >= 0;
  }
}
