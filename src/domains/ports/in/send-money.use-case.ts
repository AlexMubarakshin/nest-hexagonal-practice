import { SendMoneyCommand } from 'src/domains/ports/in/send-money.command';

export interface SendMoneyUseCase {
  sendMoney(command: SendMoneyCommand): boolean;
}
