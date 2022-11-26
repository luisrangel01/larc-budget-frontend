export interface IAccountTransaction {
  id?: string;
  accountId: string;
  type: string;
  currency: string;
  amount: number;
  note: string;
}

export interface IAccountTransactionProcess {
  accountId: string;
  type?: string;
  destinationAccountId?: string;
  currency: string;
  amount: number;
  note: string;
}
